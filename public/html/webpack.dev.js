var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        settings: ['babel-polyfill', path.join(__dirname, 'src/settings/main.js')],
        vendors: ['react', 'react-dom', 'lodash', 'whatwg-fetch']
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]/js/[name].bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-runtime']
                }
           },
           {
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
                test: /\.css$/
           }
       ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors/vendors.js'),
        // Avoid publishing files when compilation fails
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    resolve: {
        // Allows you to require('file') instead of require('file.js')
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'src']
        //fallback: [path.join(__dirname, 'node_modules')]
    }

    // Create Sourcemaps for the bundle
    // devtool: 'source-map'
};