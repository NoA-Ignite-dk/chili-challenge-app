const { join } = require('node:path');

module.exports = {
	root: true,
	env: {
		node: true,
		'react-native/react-native': true,
	},
	globals: {
		NodeJS: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
		project: join(__dirname, './tsconfig.json'),
	},
	plugins: ['react', 'react-native'],
	rules: {
		'global-require': 0,
		'eslint-comments/no-unused-disable': 'off',
		'eslint-comments/no-unlimited-disable': 'off',
		'react-native/no-inline-styles': 'off',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'off',
		'react-native/no-unused-styles': 2,
		'react-native/split-platform-components': 2,
		'react-native/no-color-literals': 2,
		'react-native/no-single-element-style-arrays': 2,
		'jsx-quotes': [2, 'prefer-double'],
		'import/prefer-default-export': 'off',
		'@typescript-eslint/no-throw-literal': 'off',
		'@typescript-eslint/ban-types': 'off',
	},
	extends: ['@noaignite-dk/eslint-config/typescript', 'prettier'],
};
