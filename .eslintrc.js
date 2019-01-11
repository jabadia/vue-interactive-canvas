module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
    ],
    rules: {
        'arrow-parens': 'off',
        'one-var': 'off',
        'indent': 'off',
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-function-paren': 'off',
        'object-property-newline': 'off',
        'curly': 'off',
        'no-debugger': 'warn',
        'spaced-comment': 'off',
        'brace-style': ['error', 'stroustrup', {'allowSingleLine': true}],
        'no-multi-spaces': ['warn', {'ignoreEOLComments': true}],
        'no-console': 'warn',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
