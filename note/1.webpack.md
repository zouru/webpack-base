###webpack
> 前身 browserify，缺点只能转化js

一、作用：

> 一切都是模块化
> webpack相当于一个模块加载器/打包工具（js,css,图片等）

二、安装：

1. 安装webpack命令环境

        sudo cnpm install webpack -g
        验证方法
        webpack --version

2. package.json 工程文件（需要依赖的模块，作者，版本等）

    1. 手动生成
    2. 在目录中  npm init   一路默认

3. 安装本地的webpack

        -D 相当于 --save-dev
        cnpm install webpack -D

三、webpack第一个小例子

1. index.html   页面

        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>webpack-demo</title>
        </head>
        <body>
            <div id="app"></div>
            <script src="bundle.js"></script>
        </body>
        </html>
2. entry.js     入口文件


        编写我们开发的代码
        var oApp = document.getElementById('app');
        oApp.innerHTML = "新增内容";

3. 将entry.js编译成 bundle.js

        webpack entry.js bundle.js
        然后运行 index.html看效果
4. 自动解决依赖例子

    1. 新建a.js

            module.exports = 'laozhou.com';

    2. 修改entry.js为

           var a = require('./a.js');//引入新模块
           var oApp = document.getElementById('app');
           oApp.innerHTML = "新增内容"+a;

    3. 测试运行index.html

            新增内容laozhou.com


四、加载除了js以外的文件，需要各种文件的loader加载器

1. css文件：

    1. 创建index.css样式文件

            body{
                background:red;
            }

    1. 需要安装对应的loader(style-loader、css-loader)

            cnpm install style-loader css-loader -D
    1. 配置

            在webpack中一个文件可能用多个loader加载，!理解为用来连接多个loader
            require('style-loader!css-loader!./index.css')  
    1. 重新编译

            webpack entry.js bundle.js

五、配置webpack.config.js

1. 作用：配置webpack的入口文件，出口文件

        module.exports = {
            entry:'./entry.js',//入口文件
            output:{
                filename:'./bundle.js',//出口
            }
        }
        下次再编译的时候不需要
        webpack entry.js bundle.js，只需要
        webpack 就可以了

2. 配置 css-loader

               module.exports = {
                   entry:'./entry.js',//入口文件
                   output:{
                       filename:'./bundle.js',//出口
                   },
                   module:{
                       loaders:[
                           /\.css$/：正则以css结尾的文件使用style-loader和css-loader
                           {test:/\.css$/,loader:'style-loader!css-loader'}
                       ]
                   }
               }

               entry.js
               require('./index.css');

3. 支持less


            //1.安装

            npm install less-loader less --save-dev

            //2.修改配置

            webpack.config.js

            {
                test:/\.less$/,
                loader:'style-loader!css-loader!less-loader'
            }
            //3. 打包

            执行打包

            webpack

4. 支持sass


            //1.安装

            npm install sass-loader sass --save-dev

            //2.修改配置

            webpack.config.js

            {
                test:/\.sass$/,
                loader:'style-loader!css-loader!sass-loader'
            }
            //3. 打包
            执行打包
            webpack

5. 自动加浏览器前缀 postcss-loader配置


            //1.安装postcss
            npm install -D postcss-loader
            //2. webpack.config.js
            {
                test:/\.less$/,
                loader:'style-loader!css-loader!postcss-loader!less-loader'
                //postcss-loader的位置不能变
            },

            //3. 在webpack.config.js同级目录创建postcss.config.js 的配置文件，内容如下
            module.exports = {
              plugins: [
                require('autoprefixer')({browsers:'ios >= 8'})
              ]
            }

        //4. 运行 num run dev测试

五、处理图片文件


            //1. 安装
            npm install -D file-loader
            //2. webpack.config.js
            {
                test:/\.(png|jpg|gif|svg)/i,
                loader:'file-loader',
                //指定打包后的图片的存放位置及命名规则
                name:'image/[name]-[hash:5].[ext]'
            }

六、url-loader 可以处理文件或图片。当文件或图片的大小大于你设定的限定时，交给 file-loader处理，当小于设定时变成base-64编码


            //1. 安装
            npm install -D url-loader
            //2. webpack.config.js
            {
                test:/\.(png|jpg|gif|svg)/i,
                loader:'url-loader',
                query:{
                    limit:20000,
                    name:'image/[name]-[hash:5].[ext]'
                }
            }


七、image-webpack-loader 压缩图片


            //1.安装
            npm install -D image-webpack-loader
            //2. webpack.config.js
            {
                test:/\.(png|jpg|gif|svg)/i,
                loaders:[
                    'url-loader?limit=20000&name=image/[name]-[hash:5].[ext]',
                    'image-webpack-loader'
                ]
            }

八、自动打包

* webpack       相当于是开发环境下的编译打包

* webpack -p    会进行代码压缩，生产环境下的编译打包       

* webpack -w    监听文件的改动，自动编译

* webpack -d    开启（生成）source maps (在chrome中可以看到编译过程，方便调试) 在 source选项卡中可见


        可以再配置项中加入 "devtool":"source-map"
        module.exports = {
            entry:'./entry.js',//入口文件
            output:{
                filename:'./bundle.js',//出口
            },
            devtool:"source-map",
            module:{
                loaders:[
                    {test:/\.css$/,loader:'style-loader!css-loader'}
                ]
            }
        }

* webpack --config config.js  

    如果不用webpack.config.js，自己定义的名字叫 config.js

七、babel配置将ES6转化为ES5

1. 安装所需模块

        cnpm install babel-loader babel-core babel-preset-es2015 -D

2. es6中模块导出及引入方式

        导出模块：
            export default{}
        引入模块：
            import 名字 from 模块路径

3. 测试bable是否可用，使用es6语法

    1. 新建b.js

            export default{
                a:1,
                b:2
            }  
    2. 修改entry.js

            var a = require('./a');
            require('./index.css');
            import es6 from './b';

            var oApp = document.getElementById('app');

            oApp.innerHTML = "新增内容" + a + es6.a +es6.b;
    3. babel配置

            module.exports = {
                entry: './entry.js',//入口文件
                output: {
                    filename: './bundle.js',//出口
                },
                devtool: "source-map",
                module: {
                    loaders: [
                        {
                            test: /\.css$/,
                            loader: 'style-loader!css-loader'
                        },
                        {
                            test:/\.js$/,
                            loader:'babel-loader',
                            exclude:/node_modules/,
                            query: {
                                presets: ['es2015']
                            }
                        }
                    ]
                },
            }

---

八、webpack-dev-server

1. 安装命令环境：

            sudo cnpm install webpack-dev-server -g
2. 运行

* webpack-dev-server
* webpack-dev-server --port     端口号
* webpack-dev-server --inline   改变完代码自动刷新浏览器
* webpack-dev-server --hot      热重载（相当于局部刷新）

      webpack-dev-server --port 8081 --inline --hot  

3. 将启动参数写入到配置文件中，增加devServer配置项
> webpack.config.js修改如下

        devServer:{
            port:8080,
            inline:true,
        },

4. 把运行的命令放入package.json文件中, npm run dev


    "scripts":{
        "dev":"webpack-dev-server"
    }


5. resolve：配置省略文件名后缀，别名等

        在webpack.config.js中加入 resolve配置项
        resolve:{
            "extensions":['.js','.css','.json'] //可以省略的扩展名
        }

九、直接打开浏览器

        npm install -D open-browser-webpack-plugin
        var OpenBrowserPlugin = require('open-browser-webpack-plugin');

        plugins: [
            new OpenBrowserPlugin({ url: 'http://localhost:8080' })
            ]
