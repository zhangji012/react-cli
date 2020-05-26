import React, { useState, useEffect } from 'react'
import icon_xz from '../../assets/xz@2x.png'
import icon_xz2 from '../../assets/xz2@2x.png'

import './index.less'

export type Props = {
  selectedCodes: string[],
  searchData: any[],
  type: number,
  onSst: (arr: string[]) => void
}

function Selected(props: Props) {
  const [showData, setShowData] = useState<any[]>([]) // 弹窗显示隐藏
  const { selectedCodes, searchData, onSst, type } = props
  useEffect(() => {
    let showData_N: any[] = []
    selectedCodes.map((item1) => {
      searchData.map((item2) => {
        if (item1 === item2.code) {
          showData_N.push(item2)
        }
      })
    })
    setShowData(showData_N)
  }, [selectedCodes.length, searchData.length])

  const handleRemoveCode = (code: string) => {
    let selectedCodes_N = [...selectedCodes]
    selectedCodes_N.splice(
      selectedCodes_N.findIndex((item) => item === code),
      1
    )
    onSst(selectedCodes_N)
  }
  const iocnPath = type === 1 ? icon_xz : icon_xz2
  return (
    <div className="ve-layer-selected clearfix">
      <span className="ve-layer-selected-left fl">已选职位</span>
      <div className="ve-layer-selected-right fl">
        <div className="clearfix">
          {showData.map((item) => {
            return (
              <div
                className="ve-layer-selected-right_item fl"
                key={item.code + item.value}
                onClick={() => {
                  handleRemoveCode(item.code)
                }}
              >
                <img src={iocnPath} alt="" />
                <span>{item.value}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Selected
