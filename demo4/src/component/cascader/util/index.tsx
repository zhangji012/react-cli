/**
 * 将职位原始数据整平
 * @param arr [Arrary]
 * @param isExtraType [bool]
 */
export const flatten = (arr: any, isExtraType: boolean) => {
  const firstLayer = arr.filter((item: any) => {
    return item.parent_id === '0';
  }).reverse();
  const firstLayerCodes = firstLayer.map((item: any) => item.code)
  
  let byFirstCode = {}
  let secondLayerCodes:any = []
  firstLayerCodes.forEach((item1:any) => {
    let item1Arr: any = []
    arr.forEach((item2: any) => {
      if(item1 === item2.parent_id) {
        item1Arr.push(item2)
        secondLayerCodes.push(item2.code)
      }
    })  
    let obj1:any = {}
    obj1[item1] = item1Arr.reverse()
    byFirstCode = {...byFirstCode, ...obj1}
  })

  let bySecondCode = {}
  let searchData:any = []

  secondLayerCodes.forEach((item1: any) => {
    let item1Arr:any = []
    arr.forEach((item2:any) => {
      if(item1 === item2.parent_id) {
        item1Arr.push(item2)
        searchData.push(item2)
      }

    })  
    item1Arr = item1Arr.reverse()

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
    bySecondCode = {...bySecondCode, ...obj1}
  })

  let searchData_N:any = []
  searchData.forEach((item:any) => {
    const firstCode = item.code.substr(0, 2) + '0000'
    const secondCode = item.code.substr(0, 4) + '00'
    let firstValue = ''
    let secondValue = ''

    arr.forEach((item2:any) => {
      if(firstCode === item2.code) {
        firstValue = item2.value
      }
      if(secondCode === item2.code) {
        secondValue = item2.value
      }
    })
    const objPath = {
      pathValue: `${firstValue}-${secondValue}-${item.value}`
    }
    const item_N = {...item, ...objPath}
    searchData_N.push(item_N)
  })

  let obj = {
    first: firstLayer,
    second: byFirstCode,
    third: bySecondCode,
    searchData: searchData_N
  }
  console.log(searchData_N);
  return obj
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

// 防抖（debounce） 非立即执行版：
// export const debounce = (func: any, wait: any) => {
//   let timeout:any;
//   return function () {
//       let context = this;
//       let args = arguments;
//       if (timeout) clearTimeout(timeout);
//       timeout = setTimeout(() => {
//           func.apply(context, args)
//       }, wait);
//   }
// }

