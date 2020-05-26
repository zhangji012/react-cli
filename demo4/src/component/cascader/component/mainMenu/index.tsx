import React, { useState, useEffect } from 'react'
import { getParentCode, sliceAddArr,sliceAddArr2, sliceAddArr3 } from '../../util/index'
import { message } from 'antd'
import icon_new from '../../assets/new.png'
import icon_minus_yellow from '../../assets/-@2x.png'
import icon_minus_blue from '../../assets/-2@2x.png'
import icon_plus from '../../assets/+@2x.png'
import icon_arrow_yellow from '../../assets/arrow@2x.png'
import icon_arrow_blue from '../../assets/arrow2@2x.png'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'
import './index.less'

export type Props = {
  data: any[],
  firstData: any,
  secondData: any,
  thirdData: any,
  selectedCodes: string[],
  limit: number,
  isIcon: boolean,
  allow: any[],
  type: number,
  onSst: (arr: any[]) => void,
  onSelect?: (code: string) => void,
  onSave: (arr: string[]) => void,
  isSave: boolean
}

function MainMenu(props: Props) {
  const {
    firstData,
    secondData,
    thirdData,
    selectedCodes,
    limit,
    isIcon,
    onSst,
    onSelect,
    allow,
    type,
    onSave,
    isSave
  } = props
  const [firstClickCode, setFirstClickCode] = useState('') // 第一层-当前点击的code
  const [secondClickCode, setSecondClickCode] = useState('') // 第二层-当前点击的code
  const [firstShowData, setFirstShowData] = useState<any[]>([])
  const [secondShowData, setSecondShowData] = useState<any[]>([])
  const [thirdShowData, setThirdShowData] = useState<any[]>([])
  const [secondClickIndex, setSecondClickIndex] = useState(1000)
  const icon_minus = type === 1 ? icon_minus_yellow : icon_minus_blue
  const icon_arrow = type === 1 ? icon_arrow_yellow : icon_arrow_blue

  const setFirstShowDataF = () => {
    const selectedparentCodes = getParentCode(selectedCodes, 1)
    const selectedgrandpaCodes = getParentCode(selectedparentCodes, 2)
    let firstData_N: any[] = []
    firstData.forEach((item1: any) => {
      let obj = {
        ...item1,
        isSelect: false,
      }
      selectedgrandpaCodes.forEach((item2: any) => {
        if (item1.code === item2) {
          obj.isSelect = true
        }
      })
      firstData_N.push(obj)
    })
    setFirstShowData(firstData_N)
  }

  const handleFirstClick = (code: string) => {
    const secondShowData = secondData[code]
    setSecondShowDataF(secondShowData)
    setFirstClickCode(code)
    setSecondClickCode('')
    setSecondClickIndex(1000)
    setThirdShowData([])
  }

  const setSecondShowDataF = (secondShowData: any[]) => {
    const selectedparentCodes = getParentCode(selectedCodes, 1)
    let secondShowData_N: any[] = []
    secondShowData.forEach((item1: any) => {
      let obj = {
        ...item1,
        isSelect: false,
      }
      selectedparentCodes.forEach((item2: any) => {
        if (item1.code === item2) {
          obj.isSelect = true
        }
      })
      secondShowData_N.push(obj)
    })
    setSecondShowData(secondShowData_N)
  }
  const setThirdShowDataF = (thirdShowData: any[]) => {
    let thirdShowData_N: any[] = []
    thirdShowData.forEach((item1) => {
      let obj = {
        ...item1,
        isSelect: false,
        disabled: true,
      }
      selectedCodes.forEach((item2) => {
        if (item1.code === item2) {
          obj.isSelect = true
        }
      })
      allow.forEach((item2) => {
        if (item1.code === item2) {
          obj.disabled = false
        }
      })

      thirdShowData_N.push(obj)
    })
    setThirdShowData(thirdShowData_N)
  }

  const handleSecondClick = (code: string, index: number) => {
    if (code === secondClickCode) {
      setSecondClickCode('')
      setSecondClickIndex(1000)
      setThirdShowData([])
    } else {
      const thirdShowData = thirdData[code]
      setThirdShowDataF(thirdShowData)
      setSecondClickCode(code)
      const secondIndex = Math.ceil((index + 1) / 5) * 5
      setSecondClickIndex(secondIndex)
    }
  }
  const handleThirdClick = (code: string) => {
    onSelect && onSelect(code)

    if(limit === 1) {
      if(isSave) {
        const selectedCodes_N = sliceAddArr3(selectedCodes, code)
        if(selectedCodes_N.length > 1) {
          message.warning(`最多选择1个哦!`)
        } else {
          onSst(selectedCodes_N)
        }
      } else {
        const selectedCodes_N = sliceAddArr2(selectedCodes, code)
        onSst(selectedCodes_N)
        if(selectedCodes_N.length) {
          onSave(selectedCodes_N)
        }
      }
    } else {
      const selectedCodes_N = sliceAddArr(selectedCodes, code, limit)
      if (selectedCodes_N) {
        onSst(selectedCodes_N)
      } else {
        message.warning(`最多选择 ${limit} 个哦!`)
      }
    }
  }

  // 获取init时默认点击第一个
  useEffect(() => {
    setFirstShowDataF()
    if (firstData[0] && firstData[0]['code']) {
      const firstCode = firstData[0]['code']
      handleFirstClick(firstCode)
    }
  }, [firstData.length])

  useEffect(() => {
    setFirstShowDataF()
    setSecondShowDataF(secondShowData)
    setThirdShowDataF(thirdShowData)
  }, [selectedCodes.length])

  const renderThumb = (obj: any) => {
    const { style, ...props } = obj
    const thumbStyle = {
        backgroundColor: '#cccccc',
        width: '4px',
        borderRadius: '4px',
        marginLeft: '2px'
    };
    return (
      <div
      style={{ ...style, ...thumbStyle }}
      {...props}/>
    );
  }
  const renderThumb2 = (obj: any) => {
    const { style, ...props } = obj
    const thumbStyle = {
        backgroundColor: '#cccccc',
        width: '4px',
        borderRadius: '4px',
        marginLeft: '1px'
    };
    return (
      <div
      style={{ ...style, ...thumbStyle }}
      {...props}/>
    );
  }
  const firstRender = () => {
    return (
      <Scrollbars style={{ width: 131, height: 438 }} renderThumbVertical={renderThumb} autoHide>
        {firstShowData.map((item) => {
          return (
            <div
              className={classNames(
                've-layer-wrap-l-item',
                item.code === firstClickCode && 'now-selected',
                item.isSelect && 'selected'
              )}
              key={item.code + item.value}
              title={item.value}
              onClick={() => {
                handleFirstClick(item.code)
              }}
            >
              <span>
                {item.value}
                {isIcon ? <img src={icon_new} alt="" /> : null}
              </span>
            </div>
          )
        })}
      </Scrollbars>
    )
  }
  const thirdSubRender = () => {
    return (
      <div className="ve-layer-third-box-content">
        {thirdShowData.map((item) => {
          return (
            <div
              className={classNames(
                've-layer-third-item',
                item.isSelect && 'selected',
                item.disabled && 'disabled'
              )}
              key={item.code + item.value}
              onClick={() => {
                !item.disabled && handleThirdClick(item.code)
              }}
              title={item.value}
            >
              <span className="ve-layer-third-item-content">
                <span className="ellipsis">{item.value}</span>
                {isIcon ? (
                  <img
                    src={icon_new}
                    className="ve-layer-third-item-content-new"
                  />
                ) : null}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
  const thirdRender = () => {
    return (
      <div className="ve-layer-third">
        <div className="ve-layer-third-box">
          {thirdShowData.length > 60 ? (
            <Scrollbars style={{ width: 676, height: 358 }} renderThumbVertical={renderThumb2} autoHide>
              {thirdSubRender()}
            </Scrollbars>
          ) : (
            thirdSubRender()
          )}
        </div>
      </div>
    )
  }

  // 010900
  const secondRender = (showData: any[], typeIndex: number) => {
    return (
      <div className="ve-layer-second">
        {showData.map((item, index) => {
          let noMargeB = false
          if (
            index >= secondClickIndex - 5 &&
            index < secondClickIndex &&
            thirdShowData.length
          ) {
            noMargeB = true
          }
          return (
            <div
              className={classNames(
                've-layer-second-item',
                noMargeB && 've-layer-second-bottom',
                item.isSelect && 'selected'
              )}
              key={item.code + item.value}
              title={item.value}
              onClick={() => {
                const index_N = typeIndex === 1 ? index : secondClickIndex + index
                handleSecondClick(item.code, index_N)
              }}
            >
              {item.code === secondClickCode ? (
                <img
                  className="ve-layer-second-item-plus"
                  src={icon_minus}
                  alt=""
                />
              ) : (
                <img
                  className="ve-layer-second-item-plus"
                  src={icon_plus}
                  alt=""
                />
              )}
              <span className={classNames('ve-layer-second-item-content', item.code === secondClickCode && 'selected')}>
                <span className="ellipsis ve-layer-second-item-content-title">
                  {item.value}
                </span>
                {isIcon ? (
                  <img
                    src={icon_new}
                    className=" ve-layer-second-item-content-new"
                  />
                ) : null}
              </span>

              {item.code === secondClickCode && thirdShowData.length > 0 ? (
                <img
                  className="ve-layer-second-item-arrow"
                  src={icon_arrow}
                  alt=""
                />
              ) : null}
            </div>
          )
        })}
      </div>
    )
  }

  const secondShowData1 = secondShowData.slice(0, secondClickIndex)
  const secondShowData2 = secondShowData.slice(secondClickIndex)

  return (
    <div className={classNames('ve-layer-wrap', type === 2 && 'skin')}>
      <div className="ve-layer-wrap-l">{firstRender()}</div>
      <div className="ve-layer-wrap-r">
        <Scrollbars style={{ width: 716, height: 438 }} renderThumbVertical={renderThumb2} autoHide>
          <div className="ve-layer-wrap-r-content">
            {secondRender(secondShowData1, 1)}
            {thirdShowData.length ? thirdRender() : null}
            {secondRender(secondShowData2, 2)}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default MainMenu
