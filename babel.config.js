module.exports = function (api) {
	if (api && api.cache) {
		api.cache(true);
	}

	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				require.resolve('babel-plugin-module-resolver'),
				{
					cwd: 'babelrc',
					extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
					alias: {
						'@src': './src',
					},
				},
			],
			[
				'module:react-native-dotenv',
				{
					moduleName: '@env',
					path: '.env',
					blacklist: null,
					whitelist: null,
					safe: false,
					allowUndefined: true,
				},
			],
		],
	};
};
