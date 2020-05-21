import React, { useEffect } from 'react'
import { throttle } from 'lodash'
import './index.less'
interface IProps {
  onSst: (obj: any) => void
  modalW: number
  modalH: number
  modalY: number
  modalX: number
  children: any
}

function DragMove(props: IProps) {
  const { modalW, modalH, onSst, modalY, modalX } = props
  const throttleMove = throttle((x, y) => {
    onSst &&
      onSst({
        modalX: x,
        modalY: y,
      })
  }, 10)

  const mousedown = (e: any) => {
    // const target = e.target
    const { clientWidth, clientHeight } = document.documentElement

    const distenceX = e.pageX - modalX
    const distenceY = e.pageY - modalY

    document.onmousemove = (event) => {
      event.preventDefault()
      let x = event.pageX - distenceX
      let y = event.pageY - distenceY
      if (x < 0) {
        x = 0
      } else if (x > clientWidth - modalW) {
        x = clientWidth - modalW
      }

      if (y < 0) {
        y = 0
      } else if (y > clientHeight - modalH) {
        y = clientHeight - modalH
      }
      throttleMove(x, y)
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
    }
  }

  const setOffSet = () => {
    const pageW = document.documentElement.clientWidth
    const pageH = document.documentElement.clientHeight
    var x = (pageW - modalW) / 2
    var y = (pageH - modalH) / 2

    onSst &&
      onSst({
        modalX: x,
        modalY: y,
      })
  }
  useEffect(() => {
    setOffSet()
  }, [])
  useEffect(() => {
    window.addEventListener('resize', setOffSet, false) // 默认冒泡
    return () => {
      window.removeEventListener('resize', setOffSet, false)
    }
  }, [])

  return (
    <div className="ve-move" onMouseDown={mousedown}>
      {props.children}
    </div>
  )
}

export default DragMove
