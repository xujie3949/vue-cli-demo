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
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none'
            }
        ]
    }
};
