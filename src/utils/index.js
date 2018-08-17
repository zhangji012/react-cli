// let baseUrl = 'http://10.0.31.116:8081'
let baseUrl = 'http://10.0.21.166:8089'
let lgoinUrl = 'http://localhost:9000/login'
// baseUrl = 'http://test.capi.order.jcease.com'
// baseUrl = 'http://10.0.50.38:8089'
lgoinUrl = 'http://test.admin.sso.jcease.com/login'

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://capiorder.jcease.com'
  lgoinUrl = 'http://ssoadmin.jcgroup.com.cn/login'
  if (TEST) {
    console.log('in TEST')
    baseUrl = 'http://test.capi.order.jcease.com'
    lgoinUrl = 'http://test.admin.sso.jcease.com/login'
  }
  if (PRE) {
    console.log('in PRE')
    baseUrl = 'http://pre.capi.order.jcease.com'
    lgoinUrl = 'http://pre.ssoadmin.jcgroup.com.cn/login'
  }
}

export { baseUrl, lgoinUrl }
