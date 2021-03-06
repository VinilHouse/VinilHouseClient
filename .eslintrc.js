module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'next',
    'prettier',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jest-dom'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    indent: 'off',
    semi: ['error', 'never'],
    'no-return-await': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'require-await': 'error',
    'react/display-name': 'warn',
    camelcase: 'off',
    'jest-dom/prefer-checked': 'error',
    'jest-dom/prefer-enabled-disabled': 'error',
    'jest-dom/prefer-required': 'error',
    'jest-dom/prefer-to-have-attribute': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/first': 'off',
    'comma-dangle': 'off',
  },
}
