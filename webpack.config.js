
const webpack = require('webpack');
const path = require('path');
module.exports = {
   mode: 'none',
   // entry: "./src/App.jsx",
   entry: {
        app: ["./src/App.jsx"],
        vendor: ["react", "react-dom", "whatwg-fetch", "react-router", "react-bootstrap", "react-router-bootstrap"]
   },
    output: {
        path: path.resolve(__dirname, "static"),
        filename: "app.bundle.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            loader: "babel-loader",
            options: {
                presets: ["react", "es2015"]
            }
        }]
    },
    devServer: {
        port: 8000,
        contentBase: 'static',
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000'
            }
        },
        historyApiFallback: true,
    },
    devtool: "source-map"
};



// module.exports = {
//     entry: {
//         app: './src/App.jsx',
//         vendor:['react', 'react-dom', 'whatwg-fetch', 'babel-polyfill'],
//     },
//     output: {
//         path: path.join(__dirname, './static'),
//         filename: "[name].bundle.js"
//     },
//     plugins: [
//         new webpack.optimize.CommonsChunkPlugin({
//             names: ["app",'vendor'],
//             minChunks: Infinity
//         })
//     ],
//     module: {
//         rules:[
//             {
//                 test:/\.jsx$/,
//                 use: {
//                     loader: 'babel-loader',
//                     query: {
//                         presets: ['react','es2015']
//                     }
//                 }
//             },
//          ]
//      },
//  };
