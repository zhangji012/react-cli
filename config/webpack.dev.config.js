/** 这是用于开发环境的webpack配置文件 **/

const path = require('path'); // 获取绝对路径用
const webpack = require('webpack'); // webpack核心
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 动态生成html插件
const HappyPack = require('happypack'); // 多线程编译
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const PUBLIC_PATH = '/'; // 基础路径
function resolve(dir='src') {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr', // webpack热更新插件，就这么写
    '@babel/polyfill',
    '../src/index.js', // 项目入口
    '../dll/vendor.dll.js',
  ],
  output: {
    path: '/', // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径
    publicPath: PUBLIC_PATH, // 文件解析路径，index.html中引用的路径会被设置为相对于此路径
    filename: 'bundle.js', //编译后的文件名字
  },
  devtool: 'inline-source-map', // 报错的时候在控制台输出哪一行报错
  context: __dirname, // entry 和 module.rules.loader 选项相对于此目录开始解析
  module: {
    rules: [
      {
        // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
        // test: /\.js?$/,
        // enforce: 'pre',
        // use: ['eslint-loader'],
        // include: resolve(),
      },
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        use: ['happypack/loader'],
        include: resolve(),
      },
      {
        // .css 解析
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        // .less 解析 (用于解析antd的LESS文件)
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', { loader: 'less-loader', options: { javascriptEnabled: true } }],
        include: resolve('node_modules'),
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
          'postcss-loader',
          'less-loader',
        ],
        include: resolve(),
      },
      {
        // 文件解析
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: resolve(),
        use: ['file-loader?name=assets/[name].[ext]'],
      },
      {
        // 图片解析
        test: /\.(png|jpg|gif)(\?|$)/,
        include: resolve(),
        use: ['url-loader?limit=8192&name=assets/[name].[ext]'],
      },
      {
        // xml文件解析
        test: /\.xml$/,
        use: ['xml-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        PUBLIC_URL: PUBLIC_PATH,
      }),
    }),
    new webpack.DllReferencePlugin({
      // context: __dirname,
      /**
       下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
       这样webpack打包时，就先直接去这个json文件中把那些预编译的资源弄进来
       **/
      manifest: require('../dll/vendor-manifest.json'),
    }),
    new HappyPack({
      loaders: ['babel-loader'],
    }),
    new HtmlWebpackPlugin({
      //根据模板插入css/js等生成最终HTML
      filename: 'index.html', //生成的html存放路径，相对于 output.path
      favicon: '../public/favicon.png', // 自动把根目录下的favicon.ico图片加入html
      template: '../public/index.ejs', //html模板路径
      inject: true, // 是否将js放在body的末尾
      templateParameters: {
        dll: "<script src='/vendor.dll.js'></script>",
        manifest: '',
      },
      // vendor: '../dll/vendor.dll.js', //与dll配置文件中output.fileName对齐
      hash:true,//防止缓存
      minify:{
        removeAttributeQuotes:true//压缩 去掉引号
      }
    }),
    // 自动生成各种类型的favicon，这么做是为了以后各种设备上的扩展功能，比如PWA桌面图标
    new FaviconsWebpackPlugin({
      logo: '../public/favicon.png',
      prefix: 'icons/',
      icons: {
        android: false,
        firefox: false,
        appleStartup: false,
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'], //后缀名自动补全
    alias: {
      '@': resolve(),
    },
  },
};
