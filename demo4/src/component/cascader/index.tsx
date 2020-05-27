import React, { useState, useEffect, useRef } from 'react'
import { message } from 'antd'
import Header from './component/header/index'
import MainMenu from './component/mainMenu/index'
import Selected from './component/selected/index'
import DragMove from './component/dragMove/index'
import { flatten } from './util/index'
import classNames from 'classnames'

import './index.less'

export type Props = {
  data: any[],
  value: string[],
  limit?: number,
  onSave: (arr: string[]) => void,
  onCancel: () => void,
  onSelect?: (code: string) => void,
  isExtraType?: boolean,
  isIcon?: boolean,
  isSave?: boolean,
  type?: number, // 1 黄色 2 蓝色
  allow?: string[], // 允许选择的项目 array[]
  title?: string // 头部标题
}
const defaultProps = {
  data: [], // 数据源
  value: [], // 选中的id数组
  limit: 5, // 最多选择数量
  onSave: undefined, // 保存回调
  onCancel: undefined, // 退出弹框
  onSelect: undefined, // 选中回调
  isExtraType: false, // 是否可选2级选项 默认不可选false boolean
  isIcon: false, // 是否展示图标
  isSave: false, // 是否单选直接关闭, true不关闭，false关闭
  type: 1, // 1 黄色 2 蓝色
  allow: [], // 允许选择的项目 array[]
  title: '请选择职位', // 头部标题
}
function Cascader(props_old: Props) {
  const allowDefault = props_old.data.map((item: any) => item.code)
  const props = {
    ...defaultProps,
    allow: allowDefault,
    ...props_old,
  }
  const {
    data,
    isExtraType,
    onSave,
    limit,
    title,
    isIcon,
    onSelect,
    isSave,
    onCancel,
    allow,
    type,
  } = props
  const [modalShow, setmodalShow] = useState(true) // 弹窗显示隐藏

  const [modalWidth, setModalWidth] = useState(848) // 弹窗宽度
  const [modalHeight, setModalHeight] = useState(643) // 弹窗高度

  const [modalX, setModalX] = useState(0) // 弹窗距离左侧距离
  const [modalY, setModalY] = useState(0) // 弹窗距离顶部
  const counterRef = useRef<HTMLDivElement>(null) // null初始值要给，严格模式
  const wrapStyle = {
    left: modalX,
    top: modalY,
  }
  const [firstData, setFirstData] = useState([]) // 整合过的数据-第一层
  const [secondData, setSecondData] = useState({}) // 整合过的数据-第二层
  const [thirdData, setThirdData] = useState({}) // 整合过的数据-第三层
  const [searchData, setSearchData] = useState([]) // 整合过的数据-搜索
  const [selectedCodes, setSelectedCodes] = useState(props.value) // 当前选中的code
  useEffect(() => {
    const modalW = counterRef.current ? counterRef.current.clientWidth : 848
    const modalH = counterRef.current ? counterRef.current.clientHeight : 643
    setModalWidth(modalW)
    setModalHeight(modalH)

    const data_flat = flatten(data, isExtraType)

    setFirstData(data_flat.first)
    setSecondData(data_flat.second)
    setThirdData(data_flat.third)
    setSearchData(data_flat.searchData)
  }, [])

  const handleDargSst = (obj: any) => {
    setModalX(obj.modalX)
    setModalY(obj.modalY)
  }

  const handleSave = () => {
    onSave && onSave(selectedCodes)
    setmodalShow(false)
    // if (selectedCodes.length > 0) {
    //   onSave && onSave(selectedCodes)
    //   setmodalShow(false)
    // } else {
    //   message.warning('请至少选择一项')
    // }
  }
  const handleCloseModal = () => {
    setmodalShow(false)
    onCancel && onCancel()
  }
  // console.log(allow);
  return (
    <div className="ve">
      {modalShow ? (
        <>
          <div className="ve-shade" />
          <div className="ve-layer" ref={counterRef} style={wrapStyle}>
            <DragMove
              onSst={handleDargSst}
              modalW={modalWidth}
              modalH={modalHeight}
              modalX={modalX}
              modalY={modalY}
            >
              <Header
                selectedCodes={selectedCodes}
                searchData={searchData}
                limit={limit}
                title={title}
                type={type}
                allow={allow}
                isSave={isSave}
                onSave={onSave}
                onSst={(arr) => {
                  setSelectedCodes(arr)
                }}
                onSelect={onSelect}
                onClose={handleCloseModal}
              />
            </DragMove>
            {isSave === false && limit === 1 ? (
              <div className="blakborder"></div>
            ) : (
              <Selected
                selectedCodes={selectedCodes}
                searchData={searchData}
                type={type}
                onSst={(arr) => {
                  setSelectedCodes(arr)
                }}
              />
            )}

            <MainMenu
              data={data}
              firstData={firstData}
              secondData={secondData}
              thirdData={thirdData}
              selectedCodes={selectedCodes}
              limit={limit}
              isIcon={isIcon}
              allow={allow}
              type={type}
              onSst={(arr) => {
                setSelectedCodes(arr)
              }}
              onSelect={onSelect}
              onSave={onSave}
              isSave={isSave}
            />
            <div className={classNames('ve-layer-btns', type === 2 && 'skin')}>
              <div className="ve-layer-btns-cancel" onClick={handleCloseModal}>
                取消
              </div>
              <div className="ve-layer-btns-ok" onClick={handleSave}>
                确认
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Cascader
