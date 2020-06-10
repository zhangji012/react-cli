/**
 * 将职位原始数据整平
 * @param arr [Arrary]
 * @param isExtraType [bool]
 * @param type [number] 
 * @param hotCityData any[] 
 * 
 * 
 */
export const flatten = (arr: any, isExtraType: boolean, type: number, hotCityData: any[]) => {
  const firstLayer = arr.filter((item: any) => {
    return item.parent_id === '0';
  })
  const firstLayerCodes = firstLayer.map((item: any) => item.code)
  let byFirstCode = {}
  let searchData:any = []

  firstLayerCodes.forEach((item1:any) => {
    let item1Arr: any = []
    arr.forEach((item2: any) => {
      if(item1 === item2.parent_id) {
        item1Arr.push(item2)
        searchData.push(item2)
      }
    })  
    if(isExtraType) {
      arr.forEach((item2: any) => {
        if(item1 === item2.code) {
          item1Arr.unshift(item2)
          searchData.push(item2)
        }
      })
    }
  

    let obj1:any = {}
    obj1[item1] = item1Arr
    byFirstCode = {...byFirstCode, ...obj1}
  })
  
  if(type === 1) {
    hotCityData.forEach((item1: any) => {
      searchData.push(item1)
      // const hasSome = searchData.some((item2:any) => item1.code === item2.code)
      // if(!hasSome) {
      //   searchData_N.push(item1)
      // }
    })
  }
  if(type === 2) {
    const regionCodes = ["010000", "020000", "030000", "040000"]
    regionCodes.forEach((item1: any) => {
      const addCode = arr.filter((item2: any) => item1 === item2.code)
      searchData = [...searchData, ...addCode]
    })
  }

  let searchCodes = searchData.map((item: any) => item.code)
  searchCodes = Array.from(new Set(searchCodes));  //用结构的方法在ts里报错

  let searchData_N:any = []
  searchCodes.forEach((item1:any) => {
    let hasSome = false
    searchData.forEach((item2:any) => {
      if(item1 === item2.code && !hasSome) {
        hasSome = true
        searchData_N.push(item2)
      }
    })
  })

  const obj = {
    firstAllData: firstLayer,
    byFirstCode: byFirstCode,
    searchData: searchData_N
  }
  return obj
}

/**
 * 将按照拼音整平
 * @param arr [Arrary]
 */
export const flattenPinyin = (arr: any) => {
  const pinyin = [
    {
      name: 'A-G',
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      // data: ['350000', '310000', '090000', '360000', '070000', '220000', '110000', '320000']
    }, {
      name: 'H-J',
      data: ['H', 'I', 'J']
      // data: ['350000', '310000', '090000', '360000', '070000', '220000', '110000', '320000']
    }, {
      name: 'K-S',
      data: ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S']
      // data: ['350000', '310000', '090000', '360000', '070000', '220000', '110000', '320000']
    }, {
      name: 'T-Z',
      data: ['T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      // data: ['350000', '310000', '090000', '360000', '070000', '220000', '110000', '320000']
    }
  ]
  pinyin.forEach((item1: any) => {
    let areaArr: any[] = []
    const data = item1.data
    data.forEach((item2: string) => {
      arr.forEach((item3: any) => {
        const firstLetter = item3['pinyin'][0]
        if(item2 === firstLetter) {
          areaArr.push(item3)
        }
      })
    })
    item1.value = areaArr
  })
  return pinyin
}
/**
 * 将按照地区整平
 * @param arr [Arrary]
 */
export const flattenRegion = (arr: any) => {
  const region = [
    {
      name: '华北-东北',
      data: ["010000", "020000", "161300", "160100", "240200", "140100", "120100"]
    }, {
      name: '华东地区',
      data: ["030000", "050100", "050200", "061100", "060900", "060100", "350100"]
    }, {
      name: '华南-华中',
      data: ["070100", "070200", "070500", "071900", "230100", "300100", "080100"]
    }, {
      name: '西北-西南',
      data: ["040000", "200100", "100100", "210100"]
    }
  ]
  region.forEach((item1: any) => {
    let areaArr: any[] = []
    const data = item1.data
    data.forEach((item2: string) => {
      arr.forEach((item3: any) => {
        if(item2 === item3.code) {
          areaArr.push(item3)
        }
      })
    })
    item1.value = areaArr
  })
  return region
}

/**
 * 获取当前选中code的父级code
 * @param selectedCodes [string]
 * @param type [number]  1:父级 2:爷爷级
 */
export const getParentCode = (selectedCodes: any, type: any) => {
  let parentCodes:any = []
  if(type === 1) {
    selectedCodes.forEach((item:any) => {
      const code = item.substr(0, 4) + '00'
      parentCodes.push(code)
    })
  } else if(type === 2) {
    selectedCodes.forEach((item:any) => {
      const code = item.substr(0, 2) + '0000'
      parentCodes.push(code)
    })
  }
  return parentCodes
}

/**
 * 数组内有相同元素删除，没有添加，limt限制，添加后超出返回false
 * @param arr [string]
 * @param code [string]
 * @param limt [number]
 * 
 */
export const sliceAddArr = (arr: string[], code: string, limt: number) => {
  let arr_N:any = [...arr]

  const hasSome = arr_N.some((item:any) => item === code)
  if(hasSome) {
    arr_N.splice(arr_N.findIndex((item:any) => item === code), 1)
  } else {
    arr_N = [...arr_N, code]
  }
  if(arr_N.length > limt) {
    return false
  } else {
    return arr_N
  }
}
/**
 * 数组内有相同元素删除，没有替换
 * @param arr [string]
 * @param code [string]
 * 
 */
export const sliceAddArr2 = (arr: string[], code: string) => {
  const hasSome = arr.some((item:any) => item === code)
  if(hasSome) {
    return []
  } else {
    return [code]
  }
}
/**
 * 数组内有相同元素删除，没有添加
 * @param arr [string]
 * @param code [string]
 * 
 */
export const sliceAddArr3 = (arr: string[], code: string) => {
  const hasSome = arr.some((item:any) => item === code)
  if(hasSome) {
    return []
  } else {
    return [...arr, code]
  }
}

/**
 * 数组内有相同元素返回原来数组，没有替换
 * @param arr [string]
 * @param code [string]
 * 
 */
export const sliceAddArr4 = (arr: string[], code: string) => {
  const hasSome = arr.some((item:any) => item === code)
  if(hasSome) {
    return arr
  } else {
    return [code]
  }
}
/**
 * 数组内有相同元素返回原来数组，没有添加
 * @param arr [string]
 * @param code [string]
 * 
 */
export const sliceAddArr5 = (arr: string[], code: string) => {
  const hasSome = arr.some((item:any) => item === code)
  if(hasSome) {
    return arr
  } else {
    return [...arr, code]
  }
}
/**
 * 数组内有相同元素不操作，没有添加，limt限制，添加后超出返回false
 * @param arr [string]
 * @param code [string]
 * @param limt [number]
 * 
 */
export const addArr = (arr: string[], code: string, limt: number) => {
  let arr_N:any = [...arr]

  const hasSome = arr.some((item: any) => item === code)
  if(hasSome) {

  } else {
    arr_N = [...arr, code]
  }
  if(arr_N.length > limt) {
    return false
  } else {
    return arr_N
  }
}

