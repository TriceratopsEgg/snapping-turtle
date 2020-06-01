module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        'jest/globals': true
    },
    extends: [
        'standard',
        'prettier',
        'eslint:recommended',
        'plugin:node/recommended',
        'plugin:security/recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
        'plugin:jest/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: [
        'eslint-plugin-security',
        'eslint-plugin-import',
        'react',
        'react-native',
        'jest',
        'prettier'
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    settings: {
        react: {
            version: '16.8.3'
        }
    },

    rules: {
        'no-var': 'error',
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-console': 'warn',
        eqeqeq: 'error',
        'prefer-const': 'error',
        'no-param-reassign': 'error',
        'no-redeclare': 'error',
        'security/detect-non-literal-fs-filename': 'off',
        'import/no-default-export': 'error',
        'node/no-unsupported-features/es-syntax': [
            'error',
            {
                ignores: ['modules']
            }
        ],
        'node/no-unpublished-import': [
            'error',
            {
                allowModules: ['react-native-dotenv', 'datauri']
            }
        ],
        'node/no-unpublished-require': [
            'error',
            {
                allowModules: ['axios']
            }
        ],
        'node/no-missing-import': [
            'error',
            {
                allowModules: [
                    '@entelectsoftwaresa/rgaxuk-common',
                    '@entelectsoftwaresa/rgaxuk-encryption'
                ]
            }
        ],
        'node/no-extraneous-require': [
            'error',
            {
                allowModules: ['uuid']
            }
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto'
            }
        ],
        'jest/no-identical-title': 'error',
        'react-native/no-raw-text': 'warn',
        'react-native/split-platform-components': 'off'
    }
};
