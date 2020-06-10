/** 用于开发环境的服务启动 **/
const path = require("path"); // 获取绝对路径有用
const express = require("express"); // express服务器端框架
const bodyParser = require("body-parser");
const env = process.env.NODE_ENV; // 模式（dev开发环境，production生产环境）
const webpack = require("webpack"); // webpack核心
const webpackDevMiddleware = require("webpack-dev-middleware"); // webpack服务器
const webpackHotMiddleware = require("webpack-hot-middleware"); // HMR热更新中间件
const webpackConfig = require("./webpack.dev.config.js"); // webpack开发环境的配置文件
const mock = require("./mock/mock-data"); // mock模拟数据，模拟后台业务
// const open = require('open');  // node下打开浏览器, 项目里暂时没有安装
var cp = require('child_process') // 和open一样都可以打开浏览器，不过open需要安装包
const app = express(); // 实例化express服务
const DIST_DIR = webpackConfig.output.path; // webpack配置中设置的文件输出路径，所有文件存放在内存中
const PORT = 8888; // 服务启动端口号

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (env === "production") {
  // 如果是生产环境，则运行build文件夹中的代码
  app.use(express.static("build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  const compiler = webpack(webpackConfig); // 实例化webpack
  app.use(express.static("dll"));
  app.use(
    webpackDevMiddleware(compiler, {
      // 挂载webpack小型服务器
      publicPath: webpackConfig.output.publicPath, // 对应webpack配置中的publicPath
      quiet: true, // 是否不输出启动时的相关信息
      stats: {
        colors: true, // 不同信息不同颜色
        timings: true // 输出各步骤消耗的时间
      }
    })
  );
  // 挂载HMR热更新中间件
  app.use(webpackHotMiddleware(compiler));
  // 所有请求都返回index.html
  app.get("*", (req, res, next) => {
    const filename = path.join(DIST_DIR, "index.html");

    // 由于index.html是由html-webpack-plugin生成到内存中的，所以使用下面的方式获取
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  });
}

/** 监听POST请求，返回MOCK模拟数据 **/
app.post("*", (req, res, next) => {
  const result = mock.mockApi(req.originalUrl, req.body);
  res.send(result);
});

/** 启动服务 **/
// app.listen(PORT, () => {
//   console.log("本地服务启动地址: http://localhost:%s", PORT);
// });
async function portInUsed(port){
  return new Promise((resolve, reject)=>{
      // let server = net.createServer().listen(port);
      let server = app.listen(port);
      server.on('listening',function(){
          server.close();
          resolve(port);
      });
      server.on('error',function(err){
          if(err.code == 'EADDRINUSE'){
              port++;
              reject(err);
          }
      });        
  });
}

const tryUsePort = function(port,_portAvailableCallback){
  portInUsed(port).then((port)=>{
      _portAvailableCallback(port);
  }).catch((err)=>{
      console.log(port+" ====被占用用====：\n");
      port++;
      tryUsePort(port,_portAvailableCallback);
  })  
}

// 测试
tryUsePort(port=PORT,function(port){
  console.log(port+" ====端口："+port+"可用====\n");
  // net.createServer().listen(port);
  app.listen(port, () => {
    console.log("本地服务启动地址: http://localhost:%s", port);
    const opneUrl = 'start chrome http://localhost:' + port;  // 此时会使用chrome打开网址，如果没有安装则会使用默认浏览器打开
    cp.exec(opneUrl)
    // const opneUrl = 'http://localhost:' + port;
    // open(opneUrl)
  });
});