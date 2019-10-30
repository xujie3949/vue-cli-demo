module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        es6: true,
        node: true,
        browser: true
    },
    extends: ['plugin:vue/recommended', '@vue/prettier'],
    rules: {
        'no-console': process.env.VUE_APP_LOCAL ? 'off' : 'error',
        'no-debugger': process.env.VUE_APP_LOCAL ? 'off' : 'error',
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none'
            }
        ]
    }
};
