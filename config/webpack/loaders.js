const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (isProductionMode) {
  return [{
    test: /\.html$/,
    exclude: /node_modules/,
    use: [{
      loader: 'html-loader',
      options: {
        minimize: true
      }
    }]
  }, {
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'eslint-loader',
      options: {
        configFile: 'config/linters/.eslintrc.json',
        failOnError: true
      }
    },
  }, {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [
          ['transform-object-rest-spread',
            {
              useBuiltIns: true
            }
          ]
        ],
        presets: [
          'flow', ['env', {
            targets: {
              browsers: [
                'last 2 versions',
                'ios_saf >= 8',
                'not IE <= 10',
                'chrome >= 49',
                'firefox >= 49',
                '> 1%'
              ]
            },
            debug: false,
            loose: true,
            modules: false,
            useBuiltIns: true
          }],
          'react'
        ],
        env: {
          development: {
            plugins: [
              'react-hot-loader/babel'
            ]
          }
        }
      }
    },
  }, {
    test: /\.s?css$/,
    // use: [
    //   'style-loader',
    //   { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
    //   'postcss-loader'
    // ]
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          sourceMap: !isProductionMode,
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: !isProductionMode,
          plugins() {
            return [
              require('autoprefixer')
            ];
          }
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: !isProductionMode,
          includePaths: ['node_modules']
        }
      }]
    })
  }, {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [{
      loader: 'svg-url-loader',
      options: {
        limit: 10000
      }
    }]
  }, {
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }]
  }, {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        limit: 10000
      }
    }]
  }];
}