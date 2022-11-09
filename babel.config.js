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
		],
	};
};
