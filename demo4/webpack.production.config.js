const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin') // ts中引入ant design
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 每次打包前清除旧的build文件夹
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制文件用

module.exports = {
  // libraryTarget 这个非常重要，之前这个没有注意  介绍 https://blog.csdn.net/frank_yll/article/details/78992778   将库的返回值分配给module.exports
  mode: 'production',
  entry: [path.resolve(__dirname, "src/component/cascader", "index.tsx")],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, "build"),
    libraryTarget: 'commonjs2' 
  },

  module: {
    rules: [
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
        ],
        exclude: [
          /node_modules/,
        ]
      },
      { 
        test: /\.(js|jsx)?$/, 
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          { loader: "less-loader", options: { javascriptEnabled: true } }
        ]
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: "./index.d.ts", to: "./index.d.ts" }
    ]),
  ],
  resolve: {
    extensions: ['.tsx', '.ts',".js", ".jsx", ".less", ".css", ".wasm", ".json"], //后缀名自动补全
  },
  externals: { // 打包到生产并发布到npm上需要开启，因为用到了react hooks，不然会因为有两个react副本而导致hooks报错
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    // todo,这个地方不懂，为什么antd没有被剔除出去，是不是应该antd已经按需加载了
    antd: {
      root: 'antd',
      commonjs2: 'antd',
      commonjs: 'antd',
      amd: 'antd'
    }
 
  },
};