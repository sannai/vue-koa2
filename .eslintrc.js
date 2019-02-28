// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint"
    },
    env: {
        browser: true
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ["plugin:vue/essential"],
    // required to lint *.vue files
    plugins: ["vue"],
    // add your custom rules here
    rules: {
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        semi: ["error", "always"],
        "no-multi-spaces": 1, // 不能用多余的空格
        "comma-dangle": [2, "never"], // 对象字面量项尾不能有逗号
        "eqeqeq": [2, "allow-null"], 
        "key-spacing": [
            1,
            {
                // 对象字面量中冒号的前后空格
                beforeColon: false,
                afterColon: true
            }
        ],
        "no-redeclare": [
            1,
            {
                // 禁止重复声明变量
                builtinGlobals: true
            }
        ],
        "no-unused-expressions": [
            1,
            {
                // 禁止无用的表达式
                allowShortCircuit: true,
                allowTernary: true
            }
        ],
        "no-use-before-define": [1, "nofunc"], // 未定义前不能使用
        eqeqeq: 1, // 必须使用全等
        indent: ["error", 4]
    }
};
