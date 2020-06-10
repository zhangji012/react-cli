import React from 'react'
import Cascader from '@/component/cascader/index'
import areaAllData from './data/area.json'
// import './index.less'

const jobData = areaAllData.data
const hotCityData = jobData['hot-city']
const allAreaData = jobData['area']

/** 所需的各种资源 **/
export type Props = {}

export type State = {
  modal1: boolean,
  selectVal: string[]
}
// console.log(jobData)
class HomePageContainer extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      modal1: true,
      selectVal: [],
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
            limit={1}
            isExtraType={false}
            isSave={false}
            type={1}
            // allow={['010000', '040700']}
            title="请选择职位1"
            // hasHotNational={true}
            // hasQuanguo={true}
            language={1}
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
        ) : null}
        <button
          onClick={() => {
            console.log(33);
            this.setState({
              modal1: true,
            })
          }}
        >
          显示地区
        </button>
      </div>
    )
  }
}

export default HomePageContainer