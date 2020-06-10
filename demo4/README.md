1. # 东方网升-pc-地区选择插件 

## 发布

1. `更改package.json版本`
2. `build:component`
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
yarn build:component		# 组件打包
```

## 使用之前


## 何时使用


## API

```jsx
<Cascader
  data={[]}
  hotCityData={[]}
  value={this.state.selectVal}
  limit={5}
  isExtraType={true}
  isSave={false}
  type={2}
  // allow={['010000', '040700']}
  title="请选择职位1"
  onSave={(arrCodes: string[], arrObj: any[]) => {
    console.log('保存', arrCodes, arrObj);
    this.setState({
      selectVal: arrCodes,
    })
    this.handleCloseModal()
  }}
  onCancel={(str?: string) => {
    this.handleCloseModal()
    console.log('取消', str)
  }}
  onSelect={(codeStr: string, codeObj: object) => {
    console.log('选中回调', codeStr, codeObj)
  }}
></Cascader>
```
### upload props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| **data** | 数据源 | Array | [] |
| **value** | 选中的id数组 | Array | - |
| hotCityData | 热门成熟数据源 | Array | [] |
| limit | 最多选择数量 | number | 5 |
| isExtraType | 是否可选2级选项 | boolean | false |
| isIcon | 是否展示图标 | boolean | false |
| isSave | 是否需要保存按钮 | boolean | true |
| type | 基础样式，1 最佳东方，黄色 2招聘通，蓝色 | number | 1 |
| allow | 允许点击的内容code | Array | 所有code |
| title | 头部标题 | string | 请选择职位 |
| hasHotNational | 热门里是有有全国 | boolean | false |
| hasQuanguo | 是否有全国 | boolean | true |
| language | 中英文 | number | 1 |
| onSave | 保存回调 | function | - |
| onCancel | 取消回调 | function | - |
| onSelect | 选中回调 | function | - |

