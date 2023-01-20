module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'simple-import-sort',
    'import',
    'small-import',
    'prettier',
  ],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'prettier/prettier': 'error',
  },
  ignorePatterns: [
    '**/dist',
    '**/node_modules',
    '**/build',
    '**/out',
    '**/.next',
    'vite.config.ts',
    'tailwind.config.cjs',
    'postcss.config.js',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
