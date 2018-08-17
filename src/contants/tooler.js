/*
* @Author: chengbs
* @Date:   2018-03-16 14:46:14
* @Last Modified by:   chengbs
* @Last Modified time: 2018-03-16 14:46:26
*/
export const returnFloat = (number) => {
  if (number === 'undefined' || number === 'null' || number === '' || typeof number === 'undefined') {
    return ''
  }
  let value = Math.round(parseFloat(number) * 100) / 100
  let xsd = value.toString().split('.')
  if (xsd.length === 1) {
    value = value.toString() + '.00'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + '0'
    }
    return value
  }
}
