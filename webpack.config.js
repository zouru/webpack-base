/**
 * Created by yu on 2017/2/15.
 */

module.exports = {
    entry: './entry.js',//入口文件
    output: {
        filename: './bundle.js',//出口
    },
    devtool: "source-map",
    devServer: {
        port: 8080,
        inline: true,
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader'
                loader: ['style-loader', 'css-loader','postcss-loader']
            },
            {
                test:/\.less$/,
                loader:'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,//node_modules下的不会进行es6编译
                query: {
                    presets: ['es2015']//使用es2015预设
                }
            },
            {
                test:/\.(png|jpg|gif|svg)/,
                loader:'file-loader',
                query:{
                    name:'image/[name]-[hash:5].[ext]'
                }
            },
            {
                test:/\.(png|jpg|gif|svg)/i,
                loader:'url-loader',
                query:{
                    limit:50000,
                    name:'image/[name]-[hash:5].[ext]'
                }
            }
        ]
    },
    resolve: {
        "extensions": ['.js', '.css', '.json']
    }
}
