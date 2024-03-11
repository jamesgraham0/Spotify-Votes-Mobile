module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true,
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off", // Should migrate to TypeScript to handle prop type checking
        "react/no-children-prop": "off",
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "ignorePatterns": ["node_modules/"],
    "globals": {
        "alert": "readonly"
    }
}
