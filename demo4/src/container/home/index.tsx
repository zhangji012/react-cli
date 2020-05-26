import React from 'react'
import Cascader from '@/component/cascader/index'
import jobAllData from './data/job.json'
// import './index.less'

const jobData = jobAllData.data.job

/** 所需的各种资源 **/
export type Props = {}

export type State = {
  modal1: boolean,
  limit: number,
  selectVal: string[]
}

class HomePageContainer extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      modal1: true,
      limit: 5,
      selectVal: [],
    }
  }
  // '010401', '020101', '010901', '060101'  餐饮总监
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
            data={jobData}
            value={this.state.selectVal}
            limit={this.state.limit}
            isExtraType={false}
            isIcon={false}
            isSave={false}
            type={1}
            // allow={['010908', '010907', '010906', '010111']}
            title="请选择职位"
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
            }}
          ></Cascader>
        ) : null}
        <button
          onClick={() => {
            this.setState({
              modal1: true,
            })
          }}
        >
          显示
        </button>
      </div>
    )
  }
}

export default HomePageContainer