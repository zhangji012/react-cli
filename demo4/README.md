1. # 东方网升-h5-职位选择插件 

## 发布

1. `更改package.json版本`
2. `build:Component`
3. `npm publish` 注：镜像源需切换回NPM官方源


## 构建 Start

```
yarn install		# 安装依赖模块
```

```
yarn dll		# 静态资源预编译
```

```
yarn start		# 运行开发环境，默认监听8888端口
```

```
yarn build:Component		# 组件打包
```

## 使用之前


## 何时使用


## API

```jsx

```
### upload props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| **data** | 数据源 | Array | - |
| **value** | 选中的id数组 | Array | - |
| limit | 最多选择数量 | number | 5 |
| isExtraType | 是否可选2级选项 | boolean | false |
| isIcon | 是否展示图标 | boolean | false |
| isSave | 是否单选直接关闭, true不关闭，false关闭 | boolean | false |
| type | 基础样式，1黄色，2蓝色 | number | 1 |
| allow | 允许点击的内容code | Array | 所有code |
| title | 头部标题 | string | 请选择职位 |
| onSave | 保存回调 | function | - |
| onCancel | 取消回调 | function | - |
| onSelect | 选中回调 | function | - |