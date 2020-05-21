import React, { useState, useEffect, useRef } from 'react'
// import { message } from 'antd'
import Header from './component/header/index'
import MainMenu from './component/mainMenu/index'
import MainMenuDfws from './component/mainMenuDfws/index'

import Selected from './component/selected/index'
import DragMove from './component/dragMove/index'
import { flatten, flattenPinyin, flattenRegion } from './util/index'
import classNames from 'classnames'

import './index.less'

export type Props = {
  data: any[]
  hotCityData: any[]
  value: string[]
  limit?: number
  onSave: (arr: string[]) => void
  onCancel: () => void
  onSelect?: (code: string) => void
  isExtraType?: boolean
  isSave?: boolean
  type?: number // 1 黄色 2 蓝色
  allow?: string[] // 允许选择的项目 array[]
  title?: string // 头部标题
}
const defaultProps = {
  data: [], // 数据源
  hotCityData: [], // 热门城市数据
  value: [], // 选中的id数组
  limit: 5, // 最多选择数量
  onSave: undefined, // 保存回调
  onCancel: undefined, // 退出弹框
  onSelect: undefined, // 选中回调
  isExtraType: false, // 是否可选2级选项 默认不可选false boolean
  isSave: true, // 是否单选直接关闭, true不关闭，false关闭
  type: 1, // 1 黄色 2 蓝色
  allow: [], // 允许选择的项目 array[]
  title: '请选择工作地点', // 头部标题
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
    hotCityData,
    isExtraType,
    onSave,
    limit,
    title,
    onSelect,
    isSave,
    onCancel,
    allow,
    type,
  } = props
  const [modalShow, setmodalShow] = useState(true) // 弹窗显示隐藏

  const [modalWidth, setModalWidth] = useState(() => {
    if (type === 1) {
      return 716
    } else {
      return 668
    }
  }) // 弹窗宽度
  const [modalHeight, setModalHeight] = useState(() => {
    if (type === 1) {
      return 431
    } else {
      return 506
    }
  }) // 弹窗高度

  const [modalX, setModalX] = useState(0) // 弹窗距离左侧距离
  const [modalY, setModalY] = useState(0) // 弹窗距离顶部
  const counterRef = useRef<HTMLDivElement>(null) // null初始值要给，严格模式

  const [firstAllData, setfirstAllData] = useState([]) // 整合过的数据-第一层所有的
  const [byFirstCode, setByFirstCode] = useState({}) // 整合过的数据-第一层code对应的数据
  const [searchData, setSearchData] = useState([]) // 整合过的数据-搜索
  const [pinyinData, setPinyinData] = useState<any[]>([]) // 拼音数据
  const [regionData, setRegionData] = useState<any[]>([]) // 地区数据
  const [selectedCodes, setSelectedCodes] = useState(props.value) // 当前选中的code
  const [invalidIndex, setInvalidIndex] = useState(1) // 无效的index，只是为了触发渲染


  useEffect(() => {
    const data_flat = flatten(data, isExtraType, type, hotCityData)
    const pinyinData = flattenPinyin(data_flat.firstAllData)
    const regionData = flattenRegion(data)
    setfirstAllData(data_flat.firstAllData)
    setByFirstCode(data_flat.byFirstCode)
    setSearchData(data_flat.searchData)
    setPinyinData(pinyinData)
    setRegionData(regionData)
  }, [])

  useEffect(() => {
    const modalW = counterRef.current ? counterRef.current.clientWidth : 716
    const modalH = counterRef.current ? counterRef.current.clientHeight : 431
    if (modalW !== modalWidth) {
      setModalWidth(modalW)
    }
    if (modalH !== modalHeight) {
      setModalHeight(modalH)
    }
  })

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
  const wrapStyle = {
    left: modalX,
    top: modalY,
    width: type === 1 ? '716px' : '668px'
  }

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
                onSst={(arr: string[]) => {
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

            {type === 1 ? (
              <MainMenu
                byFirstCode={byFirstCode}
                hotCityData={hotCityData}
                pinyinData={pinyinData}
                selectedCodes={selectedCodes}
                isExtraType={isExtraType}
                limit={limit}
                allow={allow}
                type={type}
                onSst={(arr) => {
                  setSelectedCodes(arr)
                }}
                onSelect={onSelect}
                onSave={onSave}
                isSave={isSave}
                onSstInvalidIndex={() => {
                  setInvalidIndex(invalidIndex + 1)
                }}
              />
            ) : (
              <MainMenuDfws
              byFirstCode={byFirstCode}
              firstAllData={firstAllData}
              regionData={regionData}
                selectedCodes={selectedCodes}
                isExtraType={isExtraType}
                limit={limit}
                allow={allow}
                type={type}
                onSst={(arr) => {
                  setSelectedCodes(arr)
                }}
                onSelect={onSelect}
                onSave={onSave}
                isSave={isSave}
                onSstInvalidIndex={() => {
                  setInvalidIndex(invalidIndex + 1)
                }}
              />
            )}

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
