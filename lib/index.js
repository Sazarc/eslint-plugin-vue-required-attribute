/**
 * @fileoverview Add required attributes for template nodes in vue components
 * @author Sam
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requiredAttribute = require('./rules/required-attribute');
const uniqueAttribute = require('./rules/unique-attribute');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    name: 'eslint-plugin-vue-required-attribute',
    version: '1.0.0',
  },
};

module.exports.rules = {
  'required-attribute': requiredAttribute,
  'unique-attribute': uniqueAttribute,
}
