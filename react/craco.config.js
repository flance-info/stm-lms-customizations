const injectScripts = require('webpack-dev-server-inject-scripts');
const { config: dotenvConfig } = require('dotenv');
const CracoAlias = require("craco-alias");

dotenvConfig();

const config = {
	port: process.env.PUBLIC_PORT || 8080,
	localWpPort: process.env.LOCAL_WP_PORT || 10005,
};

module.exports = {
	webpack: {
		configure: {
			output: {
				filename: 'static/js/[name].js',
			},
			optimization: {
				runtimeChunk: false,
				splitChunks: {
					chunks(chunk) {
						return false;
					},
				},
			},
		},
	},
	plugins: [
		{
			plugin: {
				overrideWebpackConfig: ({ webpackConfig }) => {
					webpackConfig.plugins[5].options.filename =
						'static/css/[name].css';
					return webpackConfig;
				},
			},
			options: {},
		},
		{
			plugin: {
				overrideWebpackConfig: ({ webpackConfig }) => {
					const terser = webpackConfig.optimization.minimizer.find(x => x.options.extractComments);
					if (terser) {
						terser.options.extractComments = false;
						terser.options.minimizer.options = {
							...terser.options.minimizer.options,
							mangle: {
								reserved: ['__']
							},
						};
					}
					return webpackConfig;
				}
			}
		},
		{
			plugin: CracoAlias,
			options: {
				source: "tsconfig",
				// baseUrl SHOULD be specified
				// plugin does not take it from tsconfig
				baseUrl: "./src",
				/* tsConfigPath should point to the file where "baseUrl" and "paths"
        are specified*/
				tsConfigPath: "./tsconfig.paths.json"
			}
		}
	],
	public: `localhost:${config.port}`,
	devMiddleware: {
		index: '',
	},
	devServer: {
		port: config.port,
		hot: true,
		open: false,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		proxy: {
			'/': {
				target: `http://localhost:${config.localWpPort}/`,
				secure: false,
				changeOrigin: true,
				withCredentials: true,
				autoRewrite: true,
				headers: {
					'X-ProxiedBy-Webpack': true,
				},
			},
		},
		setupMiddlewares: (middlewares, devServer) => {
			if (!devServer) {
				throw new Error('webpack-dev-server is not defined');
			}

			// Optional options
			const options = {};

			middlewares.unshift({
				name: 'webpack-dev-server-inject-scripts',
				middleware: injectScripts(devServer, options)
			});
			return middlewares;
		},
	}
};
