module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	plugins: ['ejs'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {},
	extends: ['google', 'prettier'],
};
