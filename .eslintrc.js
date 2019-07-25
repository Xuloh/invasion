module.exports = {
    env: {
        es6: true,
        browser: true,
        jquery: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        gameState: "writable"
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: [
        "react",
        "no-loops",
        "import"
    ],
    settings: {
        react: {
            version: "detect"
        },
        "import/resolver": "webpack"
    },
    rules: {
        "no-loops/no-loops": "warn",
        "sort-imports": "warn",
        "react/require-render-return": "off",
        "quotes": [
            "error",
            "double",
            {
                avoidEscape: true
            }
        ],
        "semi": [
            "error",
            "always"
        ],
        "curly": [
            "warn",
            "multi-or-nest"
        ],
        "default-case": "error",
        "dot-location": [
            "error",
            "property"
        ],
        "dot-notation": "warn",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "no-else-return": [
            "warn",
            {
                "allowElseIf": false
            }
        ],
        "no-empty-function": "warn",
        "no-extra-bind": "warn",
        "no-implicit-globals": "warn",
        "no-labels": "error",
        "no-multi-spaces": [
            "warn",
            {
                "ignoreEOLComments": true
            }
        ],
        "no-sequences": "warn",
        "no-throw-literal": "warn",
        "no-unused-expressions": "warn",
        "no-useless-concat": "warn",
        "no-useless-return": "warn",
        "yoda": [
            "warn",
            "never"
        ],
        "no-shadow": "warn",
        "array-bracket-newline": [
            "warn",
            {
                "multiline": true
            }
        ],
        "array-bracket-spacing": [
            "warn",
            "never"
        ],
        "array-element-newline": [
            "warn",
            "consistent"
        ],
        "block-spacing": [
            "warn",
            "always"
        ],
        "brace-style": [
            "error",
            "stroustrup",
            {
                "allowSingleLine": true
            }
        ],
        "camelcase": [
            "error",
            {
                "properties": "always"
            }
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "comma-spacing": [
            "warn",
            {
                "before": false,
                "after": true
            }
        ],
        "comma-style": [
            "warn",
            "last"
        ],
        "computed-property-spacing": [
            "warn",
            "never"
        ],
        "eol-last": [
            "warn",
            "always"
        ],
        "func-call-spacing": [
            "warn",
            "never"
        ],
        "function-paren-newline": [
            "warn",
            "consistent"
        ],
        "implicit-arrow-linebreak": [
            "warn",
            "beside"
        ],
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "jsx-quotes": [
            "warn",
            "prefer-double"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "lines-between-class-members": [
            "warn",
            "always",
            {
                "exceptAfterSingleLine": true
            }
        ],
        "multiline-ternary": [
            "warn",
            "always-multiline"
        ],
        "newline-per-chained-call": [
            "warn",
            {
                "ignoreChainWithDepth": 2
            }
        ],
        "no-lonely-if": "warn",
        "no-multi-assign": "error",
        "no-multiple-empty-lines": [
            "warn",
            {
                "max": 2,
                "maxEOF": 1,
                "maxBOF": 0
            }
        ],
        "no-trailing-spaces": "warn",
        "no-unneeded-ternary": "warn",
        "no-whitespace-before-property": "error",
        "nonblock-statement-body-position": [
            "warn",
            "below"
        ],
        "object-curly-newline": [
            "warn",
            {
                "multiline": true,
                "consistent": true
            }
        ],
        "object-curly-spacing": [
            "warn",
            "never"
        ],
        "object-property-newline": [
            "warn",
            {
                "allowAllPropertiesOnSameLine": true
            }
        ],
        "operator-assignment": [
            "warn",
            "always"
        ],
        "operator-linebreak": [
            "warn",
            "after"
        ],
        "padded-blocks": [
            "warn",
            "never"
        ],
        "prefer-object-spread": "warn",
        "quote-props": [
            "warn",
            "as-needed"
        ],
        "semi-spacing": "error",
        "semi-style": "error",
        "space-before-blocks": [
            "warn",
            "always"
        ],
        "space-before-function-paren": [
            "error",
            "never"
        ],
        "space-in-parens": "error",
        "space-infix-ops": "warn",
        "space-unary-ops": [
            "warn",
            {
                "words": true,
                "nonwords": false
            }
        ],
        "arrow-body-style": "warn",
        "arrow-parens": [
            "warn",
            "as-needed"
        ],
        "arrow-spacing": "error",
        "no-confusing-arrow": "warn",
        "no-duplicate-imports": [
            "warn",
            {
                "includeExports": true
            }
        ],
        "no-useless-constructor": "warn",
        "no-useless-rename": "warn",
        "no-var": "error",
        "prefer-arrow-callback": [
            "warn",
            {
                "allowNamedFunctions": true
            }
        ],
        "prefer-const": [
            "warn",
            {
                "ignoreReadBeforeAssign": true
            }
        ],
        "no-unused-vars": "warn"
    }
};
