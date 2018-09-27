const nodeExternals = require("webpack-node-externals");
const path = require("path");
const webpack = require("webpack");

module.exports = () => {
	return {

		entry: "./src/index.ts",

		target: "node",
		devtool: "source-map",
		externals: [nodeExternals()],
		mode: "development",

		output: {
			libraryTarget: "commonjs",
			path: path.resolve(__dirname, "dist"),
			filename: "server.js"
		},

		resolve: {
			extensions: [".ts", ".js", ".json", ".graphql", ".gql", ".hbs"]
		},

		module: {
			rules: [{
				test: /\.(ts?)|(js)$/,
				use: [{
					loader: "ts-loader"
				}],
				exclude: [
					/.*(__tests__|__mocks__).*/
				]
			}, {
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}, {
				test: /\.(sql|hbs)$/,
				exclude: /node_modules/,
				loader: "raw-loader"
			}, {
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: "graphql-tag/loader"
			}]
		},
		plugins: [
			new webpack.DefinePlugin({
				environment: JSON.stringify({
					db: {
						type: 'mysql',
						host: '0.0.0.0',
						port: 3306,
						username: 'letsplaywar',
						password: 'letsplaywar1!',
						database: 'letsplaywar',
						ssl: false
					}
				})
			})
		]

	};

};
