const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.publicPath = 'auto';
      
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'sample_shell_app',
          remotes: {
            sample_module_app: 'sample_module_app@http://localhost:3001/remoteEntry.js',
          },
          shared: {
            react: { 
              singleton: true,
              eager: true,
              requiredVersion: require('./package.json').dependencies.react
            },
            'react-dom': { 
              singleton: true,
              eager: true,
              requiredVersion: require('./package.json').dependencies['react-dom']
            },
          },
        })
      );

      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    devServerConfig.port = 3000;
    return devServerConfig;
  },
};