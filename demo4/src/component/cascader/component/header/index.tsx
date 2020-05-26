import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import icon_search from '../../assets/icon_search@2x.png'
import icon_close from '../../assets/close@2x.png'
import { Scrollbars } from 'react-custom-scrollbars'
import { addArr,sliceAddArr4, sliceAddArr5 } from '../../util/index'
// import { debounce } from 'lodash'
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
  onSst: (arr: string[]) => void,
  onSelect?: (code: string) => void,
  onClose: () => void,
  onSave: (arr: string[]) => void
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
    onSave
  } = props
  const [searchVal, setSearchVal] = useState('') // 搜索内容
  const [list, setList] = useState<any[]>([]) // 搜索内容
  const [isEdit, setIsEdit] = useState(false) // 当前是否在编辑状态

  // 在react中的debounce书写方式 https://yq.aliyun.com/articles/757035
  // todo 但是this在ts报错还不知道怎么解决, 还有如果用怎么用
  // const useDebounce = (fn:any, delay:any, dep = []) => {
  //   const {current} = useRef({fn, timer: null})
  //   useEffect(() => {
  //     current.fn = fn
  //   }, [fn])
  //   return useCallback(function f(...args) {
  //     if (current.timer) {
  //       clearTimeout(current.timer)
  //     }
  //     current.timer = setTimeout(() => {
  //       current.fn.call(this, ...args)
  //     }, delay)
  //   }, dep)
  // }
  const setListF = (searchVal: string) => {
    
    const list = searchData.filter(
      (item) => item.value.indexOf(searchVal) !== -1
    )
    let list_N: any[] = []
    if(searchVal) {
      list.map((item) => {
        let isAllow = false
        allow.forEach((item2: string) => {
          if(item2 === item.code) {
            isAllow = true
          }
        })
        const obj = {
          ...item,
          title: item.value.replace(searchVal, `<span>${searchVal}</span>`),
          isAllow: isAllow
        }
        list_N.push(obj)
      })
    }
    setList(list_N)
  }
  // const setListF_N = () => {
  //   console.log(111111);
  //   return debounce(setListF, 500)
  // }
  const handleLiClick = (code: string, isAllow: boolean) => {
    // const hasSome = allow.some((item: any) => item === code)
    if(isAllow) {
      onSelect && onSelect(code)
      if (limit === 1) {
        if(isSave) {
          const selectedCodes_N = sliceAddArr5(selectedCodes, code)
          if(selectedCodes_N.length > 1) {
            message.warning(`最多选择1个哦!`)
          } else {
            onSst(selectedCodes_N)
          }
        } else {
          const selectedCodes_N = sliceAddArr4(selectedCodes, code)
          onSst(selectedCodes_N)
          if(selectedCodes_N.length) {
            onSave(selectedCodes_N)
          }
        }
      } else {
        const selectedCodes_N = addArr(selectedCodes, code, limit)
        if (selectedCodes_N) {
          onSst(selectedCodes_N)
        } else {
          message.warning(`最多选择 ${limit} 个哦!`)
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

              <div className="search-path">{item.pathValue}</div>
              <div className="search-border"></div>
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
        marginLeft: '3px'
    };
    return (
      <div
      style={{ ...style, ...thumbStyle }}
      {...props}/>
    );
  }
  const ulRender = () => {
    if (list.length > 0 && list.length < 6) {
      return <ul className="ve-layer-header-list">{liRender()}</ul>
    } else if (list.length > 5) {
      return (
        <ul className="ve-layer-header-list">
          <Scrollbars style={{ width: 248, height: 324 }} 
          renderThumbVertical={renderThumb} autoHide
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
    console.log(e);
    if (e.keyCode === 13) {
      console.log(111111111111);
      setListF(searchVal)
    }
  }
  useEffect(() => {
    window.addEventListener('click', hideList, false)
    return () => {
      window.removeEventListener('click', hideList, false)
    }
  }, [])
   
  return (
    <div className={classNames('ve-layer-header clearfix', type === 2 && 'skin')}>
      <div className="fl ve-layer-header-title">
        <span>{title}</span>
        <span className="ve-layer-header-title_sub">
          (您最多能选择<span>{limit}</span>项)
        </span>
      </div>
      <div
        className={classNames(
          'fl',
          've-layer-header-search',
          isEdit && 've-layer-header-search_active'
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
          placeholder="请输入职位关键词"
          className="ve-layer-header-search_input"
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
        <img
          src={icon_search}
          className="ve-layer-header-search_icon"
          // onClick={setListF}
        />
        {ulRender()}
      </div>
      <img
        src={icon_close}
        className="ve-layer-header-close fr"
        onClick={onClose}
        onMouseDown={(e) => {
          e.stopPropagation()
        }}
      />
    </div>
  )
}

export default Header
