var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var TEM_PATH = path.resolve(ROOT_PATH, 'src/templates');
var VIEWS_PATH = path.resolve(ROOT_PATH, 'src/views');
var COMP_PATH = path.resolve(ROOT_PATH, 'src/js/components');

module.exports = {
    entry : {
        login : path.resolve(SRC_PATH, "js/main/login.js"),
        index : path.resolve(SRC_PATH, "js/main/index.js"),
        vendors : ['jquery'],
        //a : path.resolve(COMP_PATH, "a.js"),
        //b : path.resolve(COMP_PATH, "b.js"),
        //lib : ['a','b']
        //commons : [path.resolve(COMP_PATH, "a.js"), path.resolve(COMP_PATH, "b.js")]
    },
    output : {
        path : BUILD_PATH,
        filename : 'js/[name].[hash].js'
        //chunkFilename: "js/[id].chunk.js"
    },
    //devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: path.join(SRC_PATH, 'styles')
            }
        ]
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'vendors',
            filename : 'js/vendors.[hash].js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name : 'commons',
            chunks : ['login','index'],
            filename : 'js/commons.[hash].js'
        }),
        //new webpack.optimize.CommonsChunkPlugin({
        //    name : 'commons',
        //    filename : 'js/commons.[hash].js'
        //}),
        new HtmlWebpackPlugin({
            title : "login",
            template : path.resolve(VIEWS_PATH, 'login.html'),
            filename : 'views/login.html',
            chunks : ['vendors','commons','login'],
            //chunksSortMode : 'dependency',
            inject : 'body'
        }),
        new HtmlWebpackPlugin({
            title : "index",
            template : path.resolve(VIEWS_PATH, 'index.html'),
            filename : 'views/index.html',
            chunks : ['vendors','commons','index'],
            //chunksSortMode : 'dependency',
            inject : 'body'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new CleanWebpackPlugin(['dist', 'build'], {
            root: ROOT_PATH,
            verbose: true,
            dry: false
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};