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
  firstAllData: any[],
  regionData: any[],
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

function MainMenuDfws(props: Props) {
  const {
    byFirstCode,
    firstAllData,
    regionData,
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
    invalidIndex,
    languageTxt
  } = props
  const [firstClickCode, setFirstClickCode] = useState('') // 第一层所有省份当前点击的code
  const [regionShowData, setRegionShowData] = useState<any[]>([])
  const [firstAllShowData, setFirstAllShowData] = useState<any[]>([])
  const [secondShowData, setSecondShowData] = useState<any[]>([])
  const [firstClickIndex, setFirstClickIndex] = useState(1000)
  const icon_arrow = type === 1 ? icon_arrow_yellow : icon_arrow_blue

  const setRegionShowDataF = () => {
    let regionData_N: any[] = [...regionData]
    regionData_N.forEach((item1: any) => {
      const value = item1.value
      value.forEach((item2: any) => {
        item2.isSelect = false
        item2.disabled = true

        selectedCodes.forEach((item3: string) => {
          if (item2.code === item3) {
            item2.isSelect = true
          }
        })
        allow.forEach((item3: string) => {
          if (item2.code === item3) {
            item2.disabled = false
          }
        })
      })
    })
    setRegionShowData(regionData_N)
  }
  const setFirstAllShowDataF = () => {
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
    console.log(selectedCodes, selectedCodes_N);
    const selectedgrandpaCodes = getParentCode(selectedCodes_N, 2)
    const firstAllData_N = firstAllData.map((item1: any) => {
      let obj = {
        ...item1,
        isSelect: false,
      }
      selectedgrandpaCodes.forEach((item2: string) => {
        if (item2 === item1.code) {
          obj.isSelect = true
        }
      })
      return obj
    })

    setFirstAllShowData(firstAllData_N)
  }
  const setSecondShowDataF = (data: any[]) => {
    const secondShowData_N = data.map((item1: any) => {
      let obj = {
        ...item1,
        isSelect: false,
        disabled: true,
      }
      selectedCodes.forEach((item2: string) => {
        if (item2 === item1.code) {
          obj.isSelect = true
        }
      })
      allow.forEach((item2) => {
        if (item1.code === item2) {
          obj.disabled = false
        }
      })
      return obj
    })
    setSecondShowData(secondShowData_N)
  }
  useEffect(() => {
    setRegionShowDataF()
    setFirstAllShowDataF()
  }, [regionData.length])
  useEffect(() => {
    setRegionShowDataF()
    setFirstAllShowDataF()
    setSecondShowDataF(secondShowData)
  }, [selectedCodes.length, invalidIndex])

  const handleFirstClick = (code: string, index: number) => {
    if (firstClickCode === code) {
      setFirstClickIndex(1000)
      setFirstClickCode('')
      setSecondShowData([])
    } else {
      const firstIndex = Math.ceil((index + 1) / 8) * 8
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
      if (selectedCodes_N) {
        onSst(selectedCodes_N)
      } else {
        message.warning(`最多选择 ${limit} 个哦!`)
      }
    }
  }

  const regionRender = () => {
    return (
      <div className="vepcarea-layer-region">
        {regionShowData.map((item, index) => {
          return (
            <div key={item.name} className="vepcarea-layer-region-list">
              <div className="vepcarea-layer-region-list-l">{item.name}</div>
              <div className="vepcarea-layer-region-list-r">
                {item.value.map((item2: any) => {
                  return (
                    <div
                      key={item2.code}
                      title={item2.value}
                      className={classNames(
                        'vepcarea-layer-region-list-r-item',
                        index === 3 && 'paddingB16',
                        item2.isSelect && 'selected2',
                        item2.disabled && 'disabled'
                      )}
                      onClick={() => {
                        !item2.disabled && handleSecondClick(item2.code)
                      }}
                    >
                      <span>{item2.value}</span>
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

  const allAreaRender = (data: any[], typeIndex: number) => {
    return (
      <div className="vepcarea-layer-area">
        <div className="vepcarea-layer-area-l">
          {typeIndex === 1 ? '所有地区' : ''}
        </div>
        <div className="vepcarea-layer-area-r">
          {data.map((item: any, index: number) => (
            <div
              key={item.code}
              className={classNames(
                'vepcarea-layer-area-r-item',
                (index + 1) % 8 === 0 && 'width55',
                item.isSelect && 'selected2',
                item.disabled && 'disabled',
                firstClickCode === item.code && 'selected2'
              )}
              onClick={() => {
                const index_N =
                  typeIndex === 1 ? index : firstClickIndex + index
                handleFirstClick(item.code, index_N)
              }}
            >
              <span>{item.value}</span>
              {item.code === firstClickCode && secondShowData.length > 0 ? (
                <img
                  className="vepcarea-layer-area-r-item-arrow"
                  src={icon_arrow}
                  alt=""
                />
              ) : null}
            </div>
          ))}
        </div>
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
      <div className="vepcarea-layer-third2-box-content">
        {secondShowData.map((item) => {
          return (
            <div
              className={classNames(
                'vepcarea-layer-third2-item',
                item.isSelect && 'selected2',
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
    return (
      <div className="vepcarea-layer-third2">
        <div className="vepcarea-layer-third2-box">
          {secondShowData.length > 24 ? (
            <Scrollbars
              style={{ width: 528, height: 108 }}
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

  const firstAllShowData1 = firstAllShowData.slice(0, firstClickIndex)
  const firstAllShowData2 = firstAllShowData.slice(firstClickIndex)
  return (
    <div>
      {regionRender()}
      {allAreaRender(firstAllShowData1, 1)}
      {secondShowData.length ? secondRender() : null}
      {allAreaRender(firstAllShowData2, 2)}
    </div>
  )
}

export default MainMenuDfws
