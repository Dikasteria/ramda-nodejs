module.exports = {
  root: true,
  // Specifies the ESLint parser
  parser: '@typescript-eslint/parser',
  extends: [
      // Uses the recommended rules from @typescript-eslint/eslint-plugin
      'plugin:@typescript-eslint/recommended',
      // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin
      // that would conflict with prettier
      'prettier/@typescript-eslint',
      // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier
      // errors as ESLint errors.
      // Make sure this is always the last configuration in the extends array.
      'plugin:prettier/recommended',
  ],
  parserOptions: {
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
  },
  rules: {
      'max-len': ['warn', { code: 120 }],
      '@typescript-eslint/naming-convention': [
          2,
          {
              selector: 'default',
              format: ['camelCase'],
              leadingUnderscore: 'allowSingleOrDouble',
              trailingUnderscore: 'allow',
          },
          {
              selector: 'variable',
              format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
              leadingUnderscore: 'allowSingleOrDouble',
              trailingUnderscore: 'allow',
          },
          {
              selector: 'typeLike',
              format: ['PascalCase'],
          },
          {
              selector: ['enumMember'],
              format: ['PascalCase', 'UPPER_CASE'],
          },
      ],
  },
};