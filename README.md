# eslint-plugin-vue-required-attribute

Add required attributes for template nodes in vue components

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

[//]: # (Next, install `eslint-plugin-vue-required-attribute`:)

[//]: # ()
[//]: # (```sh)

[//]: # (npm install eslint-plugin-vue-required-attribute --save-dev)

[//]: # (```)

## Usage

Add `vue-required-attribute` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "vue-required-attribute"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "vue-required-attribute/required-attribute": [
      "error",
      [
        {
          "attribute": "data-testid", // Can be anything
          "level": "v-model-event" // always || v-model || event || v-model-event
        }
      ]
    ],
    "vue-required-attribute/unique-attribute": [
      "error",
      ["data-testid"]
    ]
  }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


