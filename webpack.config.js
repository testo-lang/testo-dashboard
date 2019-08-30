const path = require('path');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: './client/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'public/dist'),
		publicPath: 'dist/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		]
}
};
