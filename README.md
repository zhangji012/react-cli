### 技术栈
- [precss](https://github.com/jonathantneal/precss) 封装成sass语法的postcss集合插件
[eslint规则](http://git.jc/app-h5/docs/blob/master/frontend/.eslintrc.js)
[stylelint规则](http://git.jc/app-h5/docs/blob/master/frontend/.stylelintrc)
- [mockjs](https://github.com/nuysoft/Mock) 无需等待，让前端独立于后端进行开发 
- [echarts-for-react](https://github.com/hustcc/echarts-for-react) 一个简单的 echarts(v3.0) 的 react 封装 [echarts](http://echarts.baidu.com/) 也可以用官方echarts(v3.0) 
- [Ant Design of React](http://design.alipay.com/) Ant Design 的 React 实现，开发和服务于企业级后台产品。
##路由

###路由书写简单规范

- 父子路径关系应该清晰
    - 例如：在爬取待审核和视频列表都可以跳转到AddCrawler这个组件。在路由中应该配置两个跳转到AddCrawler的路径。
        - /crawler/crawlerDetail/:id/addCrawler
        - /videoList/VideoDetail/:id/addCrawler

- 在路由中添加parentPath参数，parenPath指向它的上一级路径

###面包屑
- 面包屑的基础是路由配置中的path，如果当前路径不是根据参数动态匹配的路径；你需要在路由配置中增加breadcrumbName。
    - 如："/crawler"、"/crawler/crawlerDetail/:id/addCrawler"需要配置breadcrumbName。"/crawler/crawlerDetail/:id"不需要做这个配置。
- 为当遇到根据参数匹配的路径时，需要在对应的组件中；使用alterBreadItemName方法。传入要改变的文字（如相应视频的名字）
    - alterBreadItemName在utils目录下
    - 具体的例子可以参考："src/models/Videos/crawlers/common/Detail/Detail.js"中的componentDidMount。
##Mock
###入口引入Mock（src/index.js)
    if (process.env.NODE_ENV === 'development') {// 只开发环境引入mock
      require('Contants/mock')
    }
##引用常用资源

现在在webpack配置了alias方便引用资源，举个例子当你在某个视图组件中需要引用公共组件；不管你与那个组件的相对路径是怎样的，可以直接`import AddButton from 'Components/AddButton'`

目前可以这样引用的有：

- Src: 对应src目录
- Util: 对应'src/utils/'
- Components: 对应'src/components/',
- Asserts: 对应'src/asserts/',
- Contants: 对应'src/contants/'
