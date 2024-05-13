const {
  defineTemplateBodyVisitor,
  compositingVisitors,
} = require('eslint-plugin-vue/lib/utils');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Unique attribute',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      duplicate: 'Attribute {{ attribute }} has duplicate value {{ value }}',
    },
    fixable: null,
    schema: [
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  },
  create(context) {
    /** @type {Array<String>} */
    const attributes = context.options[0];

    const attributesInComponent = {};

    /**
     * @param {VDirective | VAttribute} node
     * @returns {string | null}
     */
    function getAttributeName(node) {
      if (!node.directive) {
        return node.key.rawName;
      }

      if (
        node.key.name.name === 'bind' &&
        node.key.argument &&
        node.key.argument.type === 'VIdentifier'
      ) {
        return node.key.argument.rawName;
      }

      return null;
    }

    return compositingVisitors(defineTemplateBodyVisitor(context, {
      'VAttribute'(node) {
        const name = getAttributeName(node);

        if (attributes.includes(name)) {
          if (!attributesInComponent[name]) {
            attributesInComponent[name] = new Map();
          }
          if (node.value && node.value.value) {
            if (!attributesInComponent[name].has(node.value.value)) {
              attributesInComponent[name].set(node.value.value, []);
            }
            const nodes = attributesInComponent[name].get(node.value.value);
            nodes.push(node);
          }
        }
      },
    }), {
      'Program:exit'() {
        Object.keys(attributesInComponent).forEach((key) => {
          if (attributesInComponent[key]) {
            attributesInComponent[key].forEach((attrs) => {
              if (Array.isArray(attrs) && attrs.length > 1) {
                attrs.forEach((attr) => {
                  context.report({
                    node: attr.key,
                    loc: attr.key.loc,
                    data: { attribute: key, value: attr.value.value },
                    messageId: 'duplicate',
                  });
                });
              }
            });
          }
        });
      },
    });
  },
};
