import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import classNames from 'classnames'
import icon_arrow_yellow from '../../assets/arrow@2x.png'
import icon_arrow_blue from '../../assets/arrow2@2x.png'
import { Scrollbars } from 'react-custom-scrollbars'
import {
  getParentCode,
  sliceAddArr,
  sliceAddArr2,
  sliceAddArr3,
  replaceArr
} from '../../util'

import './index.less'

export type Props = {
  byFirstCode: any,
  hotCityData: any[],
  pinyinData: any[],
  isExtraType: boolean,
  selectedCodes: string[],
  limit: number,
  allow: any[],
  type: number,
  language: number,
  languageTxt: any,
  invalidIndex: number,
  onSst: (arr: any[]) => void,
  onSelect?: (code: string) => void,
  onSave: (arr: string[]) => void,
  isSave: boolean,
  onSstInvalidIndex: () => void
}

function MainMenu(props: Props) {
  const {
    byFirstCode,
    hotCityData,
    pinyinData,
    isExtraType,
    selectedCodes,
    limit,
    onSst,
    onSelect,
    allow,
    type,
    onSave,
    isSave,
    onSstInvalidIndex,
    languageTxt,
    language,
    invalidIndex
  } = props
  const [firstClickCode, setFirstClickCode] = useState('') // 第一层-当前点击的code

  const [pinyinShowData, setPinyinShowData] = useState<any[]>([])
  const [hotCityShowData, setHotCityShowData] = useState<any[]>([])
  const [secondShowData, setSecondShowData] = useState<any[]>([])

  const [firstClickIndex, setFirstClickIndex] = useState(1000)

  const icon_arrow = type === 1 ? icon_arrow_yellow : icon_arrow_blue

  const setPinyinShowDataF = () => {
    const regionCodes = ["010000", "020000", "030000", "040000"]
    let selectedCodes_N: string[] = []
    // 当省份不可选时
    if (!isExtraType) {
      selectedCodes.forEach((item) => {
        const hasRegion = regionCodes.some((itemCode:string) => itemCode === item)
        if (hasRegion || item.indexOf('0000') === -1) {
          selectedCodes_N.push(item)
        }
      })
    } else {
      selectedCodes_N = [...selectedCodes]
    }
    const selectedgrandpaCodes = getParentCode(selectedCodes_N, 2)

    const pinyinData_N = pinyinData.map((item1: any) => {
      const value = item1.value
      let obj = {
        ...item1
      }
      let value_N:any[] = []
      value.forEach((item2: any) => {
        let obj1 = {
          ...item2,
          isSelect: false
        }
        selectedgrandpaCodes.forEach((item3: string) => {
          if (item2.code === item3) {
            obj1.isSelect = true
          }
        })
        value_N.push(obj1)
      })
      obj.value = value_N
      return obj
    })
    setPinyinShowData(pinyinData_N)
  }
  const setHotCityShowDataF = () => {

    const hotCityData_N = hotCityData.map((item1: any) => {
      let obj = {
        ...item1,
        isSelect: false,
        disabled: true
      }
      selectedCodes.forEach((item2: string) => {
        if (item2 === item1.code) {
          obj.isSelect = true
        }
      })
      allow.forEach((item2) => {
        if (item2 === item1.code) {
          obj.disabled = false
        }
      })
      return obj
    })
    setHotCityShowData(hotCityData_N)
  }
  const setSecondShowDataF = (data: any[]) => {
    let secondShowData_N = [...data]
    secondShowData_N.forEach((item1: any) => {
      item1.isSelect = false
      item1.disabled = true

      selectedCodes.forEach((item2: string) => {
        if (item2 === item1.code) {
          item1.isSelect = true
        }
      })
      allow.forEach((item2) => {
        if (item1.code === item2) {
          item1.disabled = false
        }
      })
    })
    setSecondShowData(secondShowData_N)
  }
  useEffect(() => {
    setPinyinShowDataF()
    setHotCityShowDataF()
  }, [pinyinData.length])

  useEffect(() => {
    setPinyinShowDataF()
    setHotCityShowDataF()
    setSecondShowDataF(secondShowData)
  }, [selectedCodes.length, invalidIndex])

  const handleFirstClick = (code: string, name: string) => {
    let firstIndex = 1000

    if (firstClickCode === code) {
      setFirstClickIndex(firstIndex)
      setFirstClickCode('')
      setSecondShowData([])
    } else {
      switch (name) {
        case 'A-G':
          firstIndex = 1
          break
        case 'H-J':
          firstIndex = 2

          break
        case 'K-S':
          firstIndex = 3

          break
        case 'T-Z':
          firstIndex = 4

          break
        default:
          firstIndex = 1000
      }
      setFirstClickIndex(firstIndex)
      setFirstClickCode(code)
      const secondShowData_N = byFirstCode[code]
      setSecondShowDataF(secondShowData_N)
    }
    onSstInvalidIndex()
  }
  const handleSecondClick = (code: string) => {
    onSelect && onSelect(code)
    let selectedCodes_S = replaceArr(selectedCodes, code)
    
    if (limit === 1) {
      if (isSave) {
        const selectedCodes_N = sliceAddArr3(selectedCodes_S, code)
        if (selectedCodes_N.length > 1) {
          message.warning(`最多选择1个哦!`)
        } else {
          onSst(selectedCodes_N)
        }
      } else {
        const selectedCodes_N = sliceAddArr2(selectedCodes_S, code)
        onSst(selectedCodes_N)
        if (selectedCodes_N.length) {
          onSave(selectedCodes_N)
        }
      }
    } else {
      const selectedCodes_N = sliceAddArr(selectedCodes_S, code, limit)
      console.log('selectedCodes_S', selectedCodes, selectedCodes_S, selectedCodes_N);

      if (selectedCodes_N) {
        onSst(selectedCodes_N)
      } else {
        message.warning(`最多选择 ${limit} 个哦!`)
      }
    }
  }

  const hotCityRender = () => {
    const rw = language ===  1 ? '615px' : '710px'

    return (
      <div className="vepcarea-layer-hot clearfix">
        <div className="vepcarea-layer-hot-l">{languageTxt.hot}</div>
        <div className="vepcarea-layer-hot-r" style={{ width: rw }}>
          {hotCityShowData.map((item: any, index: number) => (
            <div
              key={item.code}
              className={classNames(
                'vepcarea-layer-hot-r-item',
                index === 9 && 'width55',
                item.isSelect && 'selected',
                item.disabled && 'disabled'
              )}
              onClick={() => {
                !item.disabled && handleSecondClick(item.code)
              }}
            >
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  const pinyinRender = (showData: any[]) => {
    return (
      <div className="vepcarea-layer-pinyin">
        {showData.map((item) => {
          return (
            <div key={item.name} className="vepcarea-layer-pinyin-list clearfix">
              <div className="vepcarea-layer-pinyin-list-l">{item.name}</div>
              <div className="vepcarea-layer-pinyin-list-r" >
                {item.value.map((item2: any, index2: number) => {
                  return (
                    <div
                      key={item2.code}
                      title={item2.value}
                      className={classNames(
                        'vepcarea-layer-pinyin-list-r-item',
                        index2 === 9 && 'width55',
                        item2.isSelect && 'selected',
                        firstClickCode === item2.code && 'selected'
                      )}
                      onClick={() => {
                        handleFirstClick(item2.code, item.name)
                      }}
                    >
                      <span>{item2.value}</span>
                      {item2.code === firstClickCode &&
                      secondShowData.length > 0 ? (
                        <img
                          className="vepcarea-layer-pinyin-list-r-item-arrow"
                          src={icon_arrow}
                          alt=""
                        />
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderThumb = (obj: any) => {
    const { style, ...props } = obj
    const thumbStyle = {
      backgroundColor: '#cccccc',
      width: '4px',
      borderRadius: '4px',
      marginLeft: '3px',
    }
    return <div style={{ ...style, ...thumbStyle }} {...props} />
  }
  const secondSubRender = () => {
    return (
      <div className="vepcarea-layer-third-box-content">
      {secondShowData.map((item) => {
        return (
          <div
            className={classNames(
              'vepcarea-layer-third-item',
              item.isSelect && 'selected',
              item.disabled && 'disabled'
            )}
            key={item.code + item.value}
            onClick={() => {
              !item.disabled && handleSecondClick(item.code)
            }}
            title={item.value}
          >
            <span>{item.code.indexOf('0000') !== -1 ? languageTxt.all : item.value}</span>
          </div>
        )
      })}
    </div>

    )
  }
  const secondRender = () => {
    const scrW = language ===  1 ? 594 : 698
    return (
      <div className="vepcarea-layer-third">
        <div className="vepcarea-layer-third-box">
        {secondShowData.length > 24 ? (
            <Scrollbars
              style={{ width: scrW, height: 108 }}
              renderThumbVertical={renderThumb}
              autoHide
            >
              {secondSubRender()}
            </Scrollbars>
          ) : (
            secondSubRender()
          )}
        </div>
      </div>
    )
  }

  const firstShowData1 = pinyinShowData.slice(0, firstClickIndex)
  const firstShowData2 = pinyinShowData.slice(firstClickIndex)

  return (
    <div className={classNames(language !== 1 && 'en')}>
      {hotCityRender()}
      {pinyinRender(firstShowData1)}
      {secondShowData.length ? secondRender() : null}
      {pinyinRender(firstShowData2)}
    </div>
  )
}

export default MainMenu
