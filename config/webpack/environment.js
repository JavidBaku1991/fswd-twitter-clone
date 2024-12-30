const { environment } = require('@rails/webpacker');
const { resolve } = require('path');

// Add a rule for handling SVG files
environment.loaders.append('svg', {
  test: /\.svg$/,
  use: ['file-loader']
});

environment.config.merge({
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css']
  }
});

const customConfig = {
  resolve: {
    alias: {
      '@src': resolve(__dirname, '../../app/javascript/src')
    },
    fallback: {
      dgram: false,
      fs: false,
      net: false,
      tls: false,
      child_process: false
    }
  }
};

environment.config.merge(customConfig);

module.exports = environment;