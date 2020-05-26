/** 这是用于生产环境的webpack配置文件 **/

const path = require("path");
const webpack = require("webpack"); // webpack核心
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 为了单独打包css
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 每次打包前清除旧的build文件夹
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制文件用
const TerserPlugin = require("terser-webpack-plugin"); // 优化js
const webpackbar = require("webpackbar");
const tsImportPluginFactory = require('ts-import-plugin') // ts中引入ant design
/**
 * 基础路径
 * 比如我上传到自己的服务器填写的是："/work/pwa/"，最终访问为"https://isluo.com/work/pwa/"
 * 根据你自己的需求填写
 * "/" 就是根路径，假如最终项目上线的地址为：https://isluo.com/， 那就可以直接写"/"
 * **/
const PUBLIC_PATH = "/";
// "@babel/polyfill", 
module.exports = {
  mode: "production",
  entry: [path.resolve(__dirname, "src/component/cascader", "index")],
  output: {
    path: path.resolve(__dirname, "build"), // 将文件打包到此目录下
    filename: 'index.js',
    // filename: "dist/[name].[chunkhash:8].js",
    // chunkFilename: "dist/[name].[chunkhash:8].chunk.js"
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          output: {
            comments: false // 不保留注释
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
        test: /\.(ts|tsx|js)?$/,
        enforce: "pre",
        use: ["eslint-loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          "babel-loader",
          {
            loader: "awesome-typescript-loader", options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                  libraryName: 'antd',   // 引入库名称
                  libraryDirectory: 'lib',   // 来源,default: lib
                  style: true
                })]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            }
          },
          // {
          //   loader: "ts-loader", options: {
          //     transpileOnly: true,
          //     getCustomTransformers: () => ({
          //       before: [tsImportPluginFactory({
          //         libraryName: 'antd',   // 引入库名称
          //         libraryDirectory: 'lib',   // 来源,default: lib
          //         // libraryDirectory: "es",
          //         style: true
          //       })]
          //     }),
          //     compilerOptions: {
          //       module: 'es2015'
          //     }
          //   }
          // }
        ],
        exclude: [
          /node_modules/,
        ]
      },
      {
        // .js .jsx用babel解析
        test: /\.js?$/,
        use: ["babel-loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        })
      },
      {
        // .less 解析
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "postcss-loader",
            { loader: "less-loader", options: { javascriptEnabled: true } }
          ]
        })
      },
      {
        // 文件解析
        test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, "src"),
        use: ["file-loader?name=dist/assets/[name].[hash:4].[ext]"]
      },
      {
        // 图片解析
        test: /\.(png|jpg|gif)$/,
        include: path.resolve(__dirname, "src"),
        use: ["url-loader?limit=8192&name=dist/assets/[name].[hash:4].[ext]"]
      },
      {
        // wasm文件解析
        test: /\.wasm$/,
        include: path.resolve(__dirname, "src"),
        type: "webassembly/experimental"
      },
      {
        // xml文件解析
        test: /\.xml$/,
        include: path.resolve(__dirname, "src"),
        use: ["xml-loader"]
      }
    ]
  },
  plugins: [
    new webpackbar(),
    /**
     * 在window环境中注入全局变量
     * 这里这么做是因为src/registerServiceWorker.js中有用到，为了配置PWA
     * **/
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        PUBLIC_URL: PUBLIC_PATH.replace(/\/$/, "")
      })
    }),
    /**
     * 打包前删除上一次打包留下的旧代码（根据output.path）
     * **/
    new CleanWebpackPlugin(),

    /**
     * 提取CSS等样式生成单独的CSS文件
     * **/
    new ExtractTextPlugin({
      filename: "dist/[name].[chunkhash:8].css", // 生成的文件名
      allChunks: true // 从所有chunk中提取
    }),
    /**
     * 文件复制
     * 这里是用于把manifest.json打包时复制到/build下 （PWA）
     * **/
    new CopyWebpackPlugin([
      { from: "./public/manifest.json", to: "./manifest.json" }
    ]),
  ],
  resolve: {
    extensions: ['.tsx', '.ts',".js", ".jsx", ".less", ".css", ".wasm", ".json"], //后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
};
