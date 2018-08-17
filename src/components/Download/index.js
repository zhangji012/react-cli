import React from 'react'
import { Button } from 'antd'

export default ({ baseUrl, api, params }) => {
  const handleClick = async () => {
    console.log(baseUrl, api, params)
    // debugger
    const res = (await api(params)) || {}
    location.href = `${baseUrl}/${res}`
  }
  return (
    <Button type='primary' onClick={handleClick}>
      导出
    </Button>
  )
}
