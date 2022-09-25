// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
		"jest/globals": true,
		"cypress/globals": true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:jest/recommended",
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "jest", "cypress"],
	rules: {},
}
