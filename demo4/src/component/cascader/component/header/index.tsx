import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import icon_search from '../../assets/icon_search@2x.png'
import icon_close from '../../assets/close@2x.png'
import { Scrollbars } from 'react-custom-scrollbars'
import { addArr, sliceAddArr4, sliceAddArr5, replaceArr } from '../../util'
import classNames from 'classnames'
import './index.less'

export type Props = {
  selectedCodes: string[],
  searchData: any[],
  limit: number,
  title: string,
  type: number,
  allow: any[],
  isSave: boolean,
  language: number,
  languageTxt: any,
  onSst: (arr: string[]) => void,
  onSelect?: (code: string) => void,
  onClose: () => void,
  onSave: (arr: string[]) => void,
}

function Header(props: Props) {
  const {
    title,
    limit,
    type,
    allow,
    selectedCodes,
    searchData,
    onSst,
    onSelect,
    onClose,
    isSave,
    onSave,
    language,
    languageTxt
  } = props
  const [searchVal, setSearchVal] = useState('') // 搜索内容
  const [list, setList] = useState<any[]>([]) // 搜索内容
  const [isEdit, setIsEdit] = useState(false) // 当前是否在编辑状态

  const setListF = (searchVal: string) => {
    const list = searchData.filter((item) => {
      const val = item.value ? item.value.toLowerCase() : ''
      return val.indexOf(searchVal) !== -1
    })
    
    let list_N: any[] = []
    if (searchVal) {
      list.forEach((item) => {
        let isAllow = false
        allow.forEach((item2: string) => {
          if (item2 === item.code) {
            isAllow = true
          }
        })

        var reg = new RegExp(searchVal, 'ig')
        var index = item.value.search(reg)
        var len = searchVal.length
        let title: string = item.value
        if (index > -1) {
          var word = item.value.substring(index, index + len)
          title = item.value.substring(0, index) + `<span>${word}</span>` + item.value.substring(index + len, item.value.length)
        }

        const obj = {
          ...item,
          title: title,
          isAllow: isAllow,
        }
        list_N.push(obj)
      })
    }
    setList(list_N)
  }

  const handleLiClick = (code: string, isAllow: boolean) => {
    if (isAllow) {
      onSelect && onSelect(code)
      let selectedCodes_S = replaceArr(selectedCodes, code)

      if (limit === 1) {
        if (isSave) {
          const selectedCodes_N = sliceAddArr5(selectedCodes_S, code)
          if (selectedCodes_N.length > 1) {
            if(language === 1) {
              message.warning(`最多选择1个哦!`)
            } else {
              message.warning(`You can choose up to 1!`)
            }
          } else {
            onSst(selectedCodes_N)
          }
        } else {
          const selectedCodes_N = sliceAddArr4(selectedCodes_S, code)
          onSst(selectedCodes_N)
          if (selectedCodes_N.length) {
            onSave(selectedCodes_N)
          }
        }
      } else {
        const selectedCodes_N = addArr(selectedCodes_S, code, limit)
        if (selectedCodes_N) {
          onSst(selectedCodes_N)
        } else {
          if(language === 1) {
            message.warning(`最多选择 ${limit} 个哦!`)
          } else {
            message.warning(`You can choose up to ${limit}!`)
          }
        }
      }
      restData()
    }
  }
  const restData = () => {
    setList([])
    setSearchVal('')
    setIsEdit(false)
  }
  const liRender = () => {
    return (
      <>
        {list.map((item) => {
          return (
            <li
              key={item.code}
              onClick={() => {
                handleLiClick(item.code, item.isAllow)
              }}
              className={classNames(!item.isAllow && 'disabled')}
            >
              <div
                className="search-name"
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></div>
            </li>
          )
        })}
      </>
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
  const ulRender = () => {
    if (list.length > 0 && list.length < 6) {
      return <ul className="vepcarea-layer-header-list">{liRender()}</ul>
    } else if (list.length > 5) {
      return (
        <ul className="vepcarea-layer-header-list">
          <Scrollbars
            style={{ width: 248, height: 288 }}
            renderThumbVertical={renderThumb}
            autoHide
          >
            {liRender()}
          </Scrollbars>
        </ul>
      )
    } else {
      return ''
    }
  }
  const hideList = () => {
    setList([])
    setIsEdit(false)
  }
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setListF(searchVal)
    }
  }
  useEffect(() => {
    window.addEventListener('click', hideList, false)
    return () => {
      window.removeEventListener('click', hideList, false)
    }
  }, [])
 const selectTxt = () => {
   if(language === 1) {
     return (<span className="vepcarea-layer-header-title_sub">
        (您最多能选择<span>{limit}</span>项)
      </span>)
   } else {
    return (<span className="vepcarea-layer-header-title_sub">
    (You can choose up to<span>{limit}</span>)
  </span>)
   }
 }
  return (
    <div
      className={classNames('vepcarea-layer-header clearfix', type === 2 && 'skin')}
    >
      <div className="fl vepcarea-layer-header-title">
        <span>{title}</span>
        {selectTxt()}
      </div>
      <div
        className={classNames(
          'fl',
          'vepcarea-layer-header-search',
          isEdit && 'vepcarea-layer-header-search_active'
        )}
        onClick={(e) => {
          e.stopPropagation()
        }}
        onMouseDown={(e) => {
          e.stopPropagation()
        }}
      >
        <input
          type="text"
          placeholder={languageTxt.inputP}
          className="vepcarea-layer-header-search_input"
          value={searchVal}
          onChange={(e) => {
            setSearchVal(e.target.value)
            setIsEdit(true)
            setListF(e.target.value)
            // setListF_N()
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsEdit(true)
          }}
          onBlur={() => {
            if (!searchVal) {
              setIsEdit(false)
            }
          }}
        />
        <img src={icon_search} className="vepcarea-layer-header-search_icon" alt="" />
        {ulRender()}
      </div>
      <img
        src={icon_close}
        className="vepcarea-layer-header-close fr"
        onClick={onClose}
        onMouseDown={(e) => {
          e.stopPropagation()
        }}
        alt=""
      />
    </div>
  )
}

export default Header
