const {
  hasAttribute,
  hasDirective,
  isBuiltInComponentName,
  defineTemplateBodyVisitor, getAttribute, getDirective,
} = require('eslint-plugin-vue/lib/utils');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Required attribute',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      required: 'Attribute {{ attribute }} required',
    },
    fixable: null,
    schema: [
      {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            attribute: {
              type: 'string',
            },
            level: {
              enum: ['always', 'v-model', 'event', 'v-model-event'],
            },
          },
          additionalProperties: false,
        },
      },
    ],
  },
  create(context) {
    const configuration = context.options[0];

    return defineTemplateBodyVisitor(context, {
      'VElement'(node) {
        if (isBuiltInComponentName(node.name)) {
          return;
        }

        const checkAttributeAndReport = ({ attribute }) => {
          const report = () => {
            context.report({
              node: node.startTag,
              loc: {
                start: {
                  line: node.startTag.loc.start.line,
                  column: node.startTag.loc.start.column + 1,
                },
                end: node.startTag.loc.end,
              },
              messageId: 'required',
              data: { attribute },
            });
          };

          if (hasAttribute(node, attribute)) {
            const attributeNode = getAttribute(node, attribute);
            if (!attributeNode.value || !attributeNode.value.value) {
              report();
            }
          } else if (hasDirective(node, 'bind', attribute)) {
            const attributeNode = getDirective(node, 'bind', attribute);
            if (!(attributeNode.value.expression && ['Identifier', 'TemplateLiteral'].includes(attributeNode.value.expression.type))) {
              report();
            }
          } else {
            report();
          }
        };

        configuration.forEach((config) => {
          if (config.level === 'always') {
            checkAttributeAndReport(config);
          }
          if (config.level === 'v-model') {
            if (hasDirective(node, 'model')) {
              checkAttributeAndReport(config);
            }
          }
          if (config.level === 'event') {
            if (hasDirective(node, 'on')) {
              checkAttributeAndReport(config);
            }
          }
          if (config.level === 'v-model-event') {
            if (hasDirective(node, 'on') || hasDirective(node, 'model')) {
              checkAttributeAndReport(config);
            }
          }
        });
      },
    });
  },
};
