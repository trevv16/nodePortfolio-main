module.exports = {
	'env': {
	  'browser': true,
	  'commonjs': true,
	  'es6': true,
	},
	'extends': [
	  'google',
	  'plugin:prettier/recommended',
	  'plugin:ejs'
	],
	"plugins": [
	  "ejs"
	],
	'globals': {
	  'Atomics': 'readonly',
	  'SharedArrayBuffer': 'readonly',
	},
	'parserOptions': {
	  'ecmaVersion': 2018,
	},
	'rules': {
	},
  };