const rule = require('../../../lib/rules/unique-attribute');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
});

ruleTester.run('unique-attribute', rule, {
  valid: [
    {
      code: '<template><custom-tag attribute="32" @click="haveFun" /></template>',
      options: [['attribute']],
    },
    {
      code: '<template><custom-tag attribute="32" @click="haveFun" /><custom-tag attribute="1" @click="haveFun" /></template>',
      options: [['attribute']],
    },
  ],
  invalid: [
    {
      code: '<template><custom-tag attribute="32" /><custom-tag attribute="32" /></template>',
      options: [['attribute']],
      errors: ['Attribute attribute has duplicate value 32', 'Attribute attribute has duplicate value 32'],
    },
  ],
});
