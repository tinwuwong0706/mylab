const { ModuleFederationPlugin } = require('webpack').container;
const fs = require('fs');
const path = require('path');

// Function to auto-discover and expose files
function generateExposes() {
  const exposes = {
    // Core exposures
    './HelloWorld': './src/App.js',
    './ColorLabel': './src/components/ColorLabel.jsx',
    './Api': './src/util/Api.js',
    './ColorApi': './src/util/Api.js', // Alternative expose
  };

  // Auto-discover and expose POC files
  const pocsDir = path.resolve(__dirname, 'src', 'pocs');
  if (fs.existsSync(pocsDir)) {
    console.log('📁 Scanning POC directory:', pocsDir);
    
    const files = fs.readdirSync(pocsDir);
    let pocCount = 0;
    
    files.forEach(file => {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        const name = path.basename(file, path.extname(file));
        const filePath = `./src/pocs/${file}`;
        
        // Add individual file exposure
        exposes[`./pocs/${name}`] = filePath;
        
        // Also expose with simple name if no conflict
        if (!exposes[`./${name}`]) {
          exposes[`./${name}`] = filePath;
        }
        
        pocCount++;
        console.log('   📄 Exposing POC:', name, '->', filePath);
      }
    });
    
    console.log(`✅ Found and exposed ${pocCount} POC files`);
  } else {
    console.log('⚠️  POC directory not found:', pocsDir);
  }

  // Auto-discover components
  const componentsDir = path.resolve(__dirname, 'src', 'component');
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir);
    files.forEach(file => {
      if ((file.endsWith('.js') || file.endsWith('.jsx')) && file !== 'ColorLabel.jsx') {
        const name = path.basename(file, path.extname(file));
        exposes[`./component/${name}`] = `./src/component/${file}`;
      }
    });
  }

  // Auto-discover utilities
  const utilDir = path.resolve(__dirname, 'src', 'util');
  if (fs.existsSync(utilDir)) {
    const files = fs.readdirSync(utilDir);
    files.forEach(file => {
      if (file.endsWith('.js') && file !== 'Api.js') {
        const name = path.basename(file, path.extname(file));
        exposes[`./util/${name}`] = `./src/util/${file}`;
      }
    });
  }

  return exposes;
}

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.publicPath = 'auto';
      
      // Generate exposes dynamically
      const exposes = generateExposes();
      
      // Log what's being exposed
      console.log('\n🚀 Module Federation Exposing:');
      Object.keys(exposes).forEach(key => {
        console.log(`   📦 ${key} -> ${exposes[key]}`);
      });
      console.log('');

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'sample_module_app',
          filename: 'remoteEntry.js',
          exposes: exposes, // Use dynamically generated exposes
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
    devServerConfig.port = 3001;
    devServerConfig.allowedHosts = 'all';
    
    // Add headers for development
    devServerConfig.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    };
    
    return devServerConfig;
  },
};