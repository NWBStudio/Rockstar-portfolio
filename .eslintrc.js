module.exports = {
    env: {
        es6: true,
        browser: true,
    },
    globals: {
        window : "readonly"
    },
    parserOptions :{
        parser: "babel-eslint"
    },
    extends : [
        'airbnb/base',
        'prettier',
        'plugin:vue/essential',
        "prettier/vue",
        "plugin:vue/recommended"
    ]
};