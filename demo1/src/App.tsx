
import React from 'react'
import Cascader from './cascader/index'
import areaAllData from './data/area.json'
// import './index.less'

const jobData = areaAllData.data
const hotCityData = jobData['hot-city']
const allAreaData = jobData['area']
// console.log(hotCityData, allAreaData);
/** 所需的各种资源 **/
export type Props = {}

export type State = {
  modal1: boolean,
  limit: number,
  selectVal: string[]
}
// console.log(jobData)
class HomePageContainer extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      modal1: true,
      limit: 5,
      selectVal: ['010000', '040700']
    }
  }
  // '010000', '040700'
  handleCloseModal = () => {
    this.setState({
      modal1: false,
    })
  }

  render() {
    const { modal1 } = this.state

    return (
      <div className="page-home">
        {modal1 ? (
          <Cascader
            data={allAreaData}
            hotCityData={hotCityData}
            value={this.state.selectVal}
            limit={this.state.limit}
            isExtraType={true}
            isSave={false}
            type={2}
            // allow={['010000', '040700']}
            // title='请选择职位1'
            onSave={(data: string[]) => {
              console.log('保存', data)
              this.setState({
                selectVal: data,
              })
              this.handleCloseModal()
            }}
            onCancel={() => {
              this.handleCloseModal()
              console.log('取消')
            }}
            onSelect={(code: string) => {
              console.log('选中回调', code)
            }}></Cascader>
        ) : (
          <button
            onClick={() => {
              this.setState({
                modal1: true,
              })
            }}>
            显示
          </button>
        )}
      </div>
    )
  }
}

export default HomePageContainer
