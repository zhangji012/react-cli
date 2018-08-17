
let addSequence = (data) => {
  if (data !== null && data !== undefined) {
    data.forEach((item, index) => {
      data[index].sequence = index + 1
    })
  }
  return data
}

// 小数转化为百分比，并且保留2位
let toPercentage = (data) => {
  if (data !== null && data !== undefined) {
    data = Math.round(Number(data) * 10000) / 100 + '%'
  } else {
    data = '--'
  }
  return data
}

// 如果有小数最多保留2位
let toPercentage2 = (data) => {
  if (data !== null && data !== undefined) {
    data = Math.round(Number(data) * 100) / 100
  } else {
    data = '--'
  }
  return data
}
// 数据为空显示 --
let ifNull = function (data) {
  if (data !== null && data !== undefined) {
    return data
  } else {
    return '--'
  }
}
export { addSequence, toPercentage, toPercentage2, ifNull }
