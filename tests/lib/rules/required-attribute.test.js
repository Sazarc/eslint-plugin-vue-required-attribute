const rule = require('../../../lib/rules/required-attribute');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
});

ruleTester.run('required-attribute', rule, {
  valid: [
    {
      code: '<template><custom-tag attribute="32" @click="haveFun" /></template>',
      options: [[{ attribute: 'attribute', level: 'always' }]],
    },
    {
      code: '<template><custom-tag attribute="32" /></template>',
      options: [[{ attribute: 'attribute', level: 'always' }]],
    },
    {
      code: '<template><custom-tag :attribute="variable" /></template>',
      options: [[{ attribute: 'attribute', level: 'always' }]],
    },
    {
      code: '<template><custom-tag :attribute="`dynamic-string-${variable}`" /></template>',
      options: [[{ attribute: 'attribute', level: 'always' }]],
    },
    {
      code: `<template>
  <custom-tag
    attribute="string"
  />
</template>`,
      options: [[{ attribute: 'attribute', level: 'always' }]],
    },
    {
      code: '<template><custom-tag /></template>',
      options: [[{ attribute: 'attribute', level: 'v-model' }]],
    },
    {
      code: '<template><custom-tag v-model="thatVar" attribute="42" /></template>',
      options: [[{ attribute: 'attribute', level: 'v-model' }]],
    },
    {
      code: '<template><custom-tag v-model="thatVar" attribute="42" @click="haveFun" /></template>',
      options: [[{ attribute: 'attribute', level: 'event' }]],
    },
    {
      code: '<template><custom-tag attribute="42" @click="haveFun" /></template>',
      options: [[{ attribute: 'attribute', level: 'event' }]],
    },
    {
      code: '<template><custom-tag attribute="42" @click="haveFun" /></template>',
      options: [[{ attribute: 'attribute', level: 'v-model-event' }]],
    },
    {
      code: '<template><custom-tag v-model="thatVar" attribute="42" @click="haveFun" /></template>',
      options: [[{ attribute: 'attribute', level: 'v-model-event' }]],
    },
  ],
  invalid: [
    {
      code: '<template><custom-tag /></template>',
      options: [[{ attribute: 'attribute', level: 'always' }]],
      errors: ['Attribute attribute required'],
    },
    {
      code: `<template>
  <custom-tag
    v-model="var"
  />
</template>`,
      options: [[{ attribute: 'attribute', level: 'always' }]],
      errors: ['Attribute attribute required'],
    },
    {
      code: '<template><custom-tag v-model="thatVar" /></template>',
      options: [[{ attribute: 'attribute', level: 'v-model' }]],
      errors: ['Attribute attribute required'],
    },
    {
      code: '<template><custom-tag @click="haveFun" /></template>',
      options: [[{ attribute: 'attribute', level: 'event' }]],
      errors: ['Attribute attribute required'],
    },
    {
      code: '<template><custom-tag v-model="thatVar" /></template>',
      options: [[{ attribute: 'attribute', level: 'v-model-event' }]],
      errors: ['Attribute attribute required'],
    },
    {
      code: '<template><custom-tag @click="haveFun" /></template>',
      options: [[{ attribute: 'attribute', level: 'v-model-event' }]],
      errors: ['Attribute attribute required'],
    },
    {
      code: '<template><custom-tag v-model="someVar" attribute="" /></template>',
      options: [[{ attribute: 'attribute', level: 'v-model' }]],
      errors: ['Attribute attribute required'],
    },
    {
      code: '<template><custom-tag v-model="someVar" :attribute="" /></template>',
      options: [[{ attribute: 'attribute', level: 'v-model' }]],
      errors: ['Attribute attribute required'],
    },
  ],
});
