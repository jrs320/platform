var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');
var TEM_PATH = path.resolve(ROOT_PATH, 'src/templates');
var VIEWS_PATH = path.resolve(ROOT_PATH, 'src/views');
var COMP_PATH = path.resolve(ROOT_PATH, 'src/js/components');

var extractCSS = new ExtractTextPlugin('css/[name].[hash].css');

module.exports = {
    entry : {
        login : path.resolve(SRC_PATH, "js/main/login.js"),
        index : path.resolve(SRC_PATH, "js/main/index.js"),
        vendors : ['jquery']
    },
    output : {
        path : DIST_PATH,
        publicPath : '../',
        filename : 'js/[name].[hash].js'
    },
    //devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader : extractCSS.extract(['css','sass']),
                include: path.join(SRC_PATH, 'styles')
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            }
        ]
    },
    plugins : [
        // css 抽取
        extractCSS,
        // js 压缩
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        /*
         * commons include vendors, commons setted front,then set vendors.
         * if reverse position of this two commonsChunkPlugin,
         * vendors(jquery) cann't be splited from commons when building.
         */
        new webpack.optimize.CommonsChunkPlugin({
            name : 'commons',
            chunks : ['login','index'],
            filename : 'js/commons.[hash].js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name : 'vendors',
            filename : 'js/vendors.[hash].js',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title : "login",
            template : path.resolve(VIEWS_PATH, 'login.html'),
            filename : 'views/login.html',
            chunks : ['vendors','commons','login'],
            inject : 'body'
        }),
        new HtmlWebpackPlugin({
            title : "index",
            template : path.resolve(VIEWS_PATH, 'index.html'),
            filename : 'views/index.html',
            chunks : ['vendors','commons','index'],
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