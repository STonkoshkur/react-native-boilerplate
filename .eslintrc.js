module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint:recommended', // base eslint rules
    'plugin:@typescript-eslint/eslint-recommended', // disabled ESlint base rules that will conflict with TS
    'plugin:@typescript-eslint/recommended', // uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // simmilar with @typescript-eslint/recommended, difference being that all rules in this set will require type information to use
    'prettier/@typescript-eslint', // uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/react',
    'plugin:react/recommended', // recomended rules for React from @eslint-plugin-react
    'plugin:react-hooks/recommended',
    'plugin:react-native/all', // specific rules for RN
    '@react-native-community',
    'plugin:prettier/recommended', // enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // react/jsx
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },
    ],
    "react/jsx-max-props-per-line": [
      1,
      {
        "maximum": 1,
        "when": "multiline"
      }
    ],
    // typescript
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-empty-function' : 1,

    // naming
    'camelcase': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'function',
        'format': ['camelCase', 'PascalCase'],
      },
      {
        'selector': 'variable',
        'types': ['function'],
        'format': ['camelCase', 'PascalCase'],
      },
      {
        'selector': 'variable',
        'format': ['camelCase', 'UPPER_CASE', 'PascalCase'],
        'leadingUnderscore': 'forbid',
        'trailingUnderscore': 'forbid',
      },
      {
        'selector': 'variable',
        'types': ['boolean'],
        'format': ['PascalCase'],
        'prefix': ['is', 'should', 'has', 'can', 'did', 'will']
      },
      {
        'selector': 'typeLike',
        'format': ['PascalCase']
      },
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'prefix': ['I'],
      },
      {
        'selector': 'default',
        'format': ['camelCase', 'PascalCase'],
        'leadingUnderscore': 'forbid',
        'trailingUnderscore': 'forbid',
      },
    ],

    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/no-floating-promises': 'off',
    // '@typescript-eslint/ban-ts-comment': [
    //   'error',
    //   {
    //     'ts-ignore': 'allow-with-description'
    //   }
    // ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNullish: true,
      }
    ],
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        typedefs: false,
        variables: false
      },
    ],
    // hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // react native
    'react-native/no-raw-text': 1,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/sort-styles': [
      'error',
      'asc',
      {
        'ignoreClassNames': true,
      }
    ],
  },
  plugins: ['@typescript-eslint', 'prettier', 'react-hooks', 'react-native'],
  env: {
    'react-native/react-native': true,
  },
  settings: {
    react: {
      version: 'detect', // tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  ignorePatterns: ['/*.js', 'custom.d.ts', 'node_modules/*']

};
