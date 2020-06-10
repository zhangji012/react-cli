import React, { useState, useEffect, useRef } from 'react'
// import { message } from 'antd'
import axios from "axios"
import Header from './component/header/index'
import MainMenu from './component/mainMenu/index'
import MainMenuDfws from './component/mainMenuDfws/index'
import Selected from './component/selected/index'
import DragMove from './component/dragMove/index'
import { flatten, flattenPinyin, flattenRegion } from './util/index'
import { cn, en } from './language'
import classNames from 'classnames'
import './index.less'

export type Props = {
  data: any[],
  hotCityData: any[],
  value: string[],
  limit?: number,
  onSave: (arrCodes: string[], arrObj: any[]) => void,
  onCancel: (str?: string) => void,
  onSelect?: (codeStr: string, codeObj: object) => void,
  isExtraType?: boolean,
  isSave?: boolean,
  type?: number, // 1 黄色 2 蓝色
  allow?: string[], // 允许选择的项目 array[]
  title?: string, // 头部标题
  hasHotNational?: boolean,  // 热门里是有有全国
  language?: number,  // 1 中文 2 英文
  hasQuanguo?: boolean,  // 是否有全国

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
  hasHotNational: false,   // 热门里是有有全国
  language: 1,           // 默认中文
  hasQuanguo: true,       // 默认有全国
}

function Cascader(props_old: Props) {
  const allowDefault = props_old.data.map((item: any) => item.code)
  const props = {
    ...defaultProps,
    allow: allowDefault,
    ...props_old,
  }
  const {
    isExtraType,
    onSave,
    limit,
    title,
    onSelect,
    isSave,
    onCancel,
    type,
    hasHotNational,
    language,
    hasQuanguo
  } = props
 
  const [data, setData] = useState(props.data) // 基础数据
  const [hotCityData, setHotCityData] = useState(() => {
    if(!hasHotNational) {
      const hotCityData_N = props.hotCityData.filter((item:any) => item.code !== '370100')
      return hotCityData_N 
    } else {
      return props.hotCityData
    }
  }) // 基础数据
  const [allow, setAllow] = useState(props.allow) // 允许选择的code

  const [modalShow, setmodalShow] = useState(false) // 弹窗显示隐藏
  const [modalWidth, setModalWidth] = useState(() => {
    if (type === 1) {
      if(language === 1) {
        return 716
      } else {
        return 820
      }
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
  const [invalidIndex2, setInvalidIndex2] = useState(1) // 无效的index，只是为了触发渲染

  const languageTxt = language === 1 ? cn : en

  useEffect(() => {
    // const nowTime = new Date().getTime()
    // https在ie9上有跨域问题
    const url = language === 1 ? 'https://dfws-file.veimg.cn/dict/ve/cn/common/region.json' : 'https://dfws-file.veimg.cn/dict/ve/en/common/region.json'
    if(data.length === 0) {
      axios.get(url)
      .then(function (response) {
        if(response.status === 200) {
          const jobData = response.data.data
          let hotCityData_N = jobData['hot-city']
          const allAreaData = jobData['area']
          const allowDefault = allAreaData.map((item: any) => item.code)
          if(!props_old.allow) {
            setAllow(allowDefault)
          }

          if(!hasHotNational) {
            hotCityData_N = hotCityData_N.filter((item:any) => item.code !== '370100')
          }

          setHotCityData(hotCityData_N)
          setData(allAreaData)
        }
      })
    }
  }, [])
  useEffect(() => {
    if(data.length > 0) {
      const data_flat = flatten(data, isExtraType, type, hotCityData)
      const pinyinData = flattenPinyin(data_flat.firstAllData, hasQuanguo)
      const regionData = flattenRegion(data)
      setfirstAllData(data_flat.firstAllData)
      setByFirstCode(data_flat.byFirstCode)
      setSearchData(data_flat.searchData)
      setPinyinData(pinyinData)
      setRegionData(regionData)  

    }
    setTimeout(() => {
      setmodalShow(true)
    }, 100)
  }, [data.length])

  useEffect(() => {
    const modalW = counterRef.current ? counterRef.current.clientWidth : ( language === 1 ? 716 : 820)
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
  const codeToVlue = (arr: string[]) => {
    let arr_N: any[] = []
    arr.forEach((item1) => {
      let obj = {
        code: item1,
        value: ''
      }
      searchData.forEach((item2:any) => {
        if(item1 === item2.code) {
          obj.value= item2.value
        }
      })
      arr_N.push(obj)
    })
    return arr_N
  }
  const handleSave = () => {
    const arr_N = codeToVlue(selectedCodes)
    onSave && onSave(selectedCodes, arr_N)
    setmodalShow(false)
  }
  const handleLimt1Save = (arr: string[]) => {
    const arr_N = codeToVlue(arr)
    onSave && onSave(arr, arr_N)
  }
  const handleSelect = (code: string) => {
    let obj = {
      code: code,
      value: ''
    }
    searchData.forEach((item:any) => {
      if(code === item.code) {
        obj.value= item.value
      }
    })
    onSelect && onSelect(code, obj)
  }
  const handleCloseModal = () => {
    setmodalShow(false)
    if(type === 2 && limit === 1) {
      onCancel && onCancel('0')
    } else {
      onCancel && onCancel('')
    }
  }

  const wrapStyle = {
    left: modalX,
    top: modalY,
    width: type === 1 ? ( language === 1 ? '716px' : '820px') : '668px',
  }
  return (
    <div className="vepcarea">
      {modalShow ? (
        <>
          <div className="vepcarea-shade" />
          <div className="vepcarea-layer clearfix" ref={counterRef} style={wrapStyle}>
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
                language={language}
                languageTxt={languageTxt}
                onSave={handleLimt1Save}
                onSst={(arr: string[]) => {
                  setSelectedCodes(arr)
                  setInvalidIndex2(invalidIndex2 + 1)
                }}
                onSelect={handleSelect}
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
                languageTxt={languageTxt}
                invalidIndex={invalidIndex2}
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
                language={language}
                languageTxt={languageTxt}
                invalidIndex={invalidIndex2}

                onSst={(arr) => {
                  setSelectedCodes(arr)
                  setInvalidIndex2(invalidIndex2 + 1)
                }}
                onSelect={handleSelect}
                onSave={handleLimt1Save}
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
                language={language}
                languageTxt={languageTxt}
                invalidIndex={invalidIndex2}
                onSst={(arr) => {
                  setSelectedCodes(arr)
                  setInvalidIndex2(invalidIndex2 + 1)
                }}
                onSelect={handleSelect}
                onSave={handleLimt1Save}
                isSave={isSave}
                onSstInvalidIndex={() => {
                  setInvalidIndex(invalidIndex + 1)
                }}
              />
            )}

            <div className={classNames('vepcarea-layer-btns ', type === 2 && 'skin')}>
              <div className="vepcarea-layer-btns-cancel" onClick={handleCloseModal}>
                {type === 2 && limit === 1 ? languageTxt.unlimited : languageTxt.cancel}
              </div>
              <div className="vepcarea-layer-btns-ok" onClick={handleSave}>
                {languageTxt.save}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Cascader
