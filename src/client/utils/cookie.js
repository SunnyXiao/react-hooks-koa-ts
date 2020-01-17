import store from '../store'
// 设置cookie
export function setCookie (name, value, seconds) {
  seconds = seconds || 0 // seconds有值就直接赋值，没有为0，这个根php不一样。
  var expires = ''
  if (seconds !== 0) { // 设置cookie生存时间
    var date = new Date()
    var expiresTime = new Date(date.getTime() + seconds * 1000)
    expires = '; expires=' + expiresTime.toGMTString()
    // console.log(name, '====', expires)
  }
  document.cookie = name + '=' + escape(value) + expires + '; path=/'
}
// 读取cookie
export function getCookie (name) {
  if (document.cookie.length > 0) {
    let nameEQ = name + '='
    let ca = document.cookie.split(';') // 把cookie分割成组
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i] // 取得字符串
      while (c.charAt(0) === ' ') { // 判断一下字符串有没有前导空格
        c = c.substring(1, c.length) // 有的话，从第二位开始取
      }
      if (c.indexOf(nameEQ) === 0) { // 如果含有我们要的name
        return unescape(c.substring(nameEQ.length, c.length)) // 解码并截取我们要值
      }
    }
    return null
  }

  return null
}

// 清除cookie
export function clearCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)

  if (cval != null) {
    document.cookie = name + "=''; expires=" + exp.toGMTString()
    document.cookie = name + "=''; expires=" + exp.toGMTString() + '; path=/' // bugfix:页面偶发性无法退出登录，出现重名的cookie，需要特殊删除
  }
}

export function setStorage (token, data) {
  setCookie('access_token', token, 86400)
  setCookie('token', JSON.stringify(data), 86400)
  setCookie('userMobile', data.usermobile, 86400)
  setCookie('userName', data.username, 86400)
}

export function localStorageRemove () {
  console.log('remove Dealer related')
  localStorage.removeItem('AFC')
  localStorage.removeItem('Dealer')
  localStorage.removeItem('fc-backend')
  localStorage.removeItem('LC')
  localStorage.removeItem('loginUser')
  localStorage.removeItem('redirectUrl')
}
export function resetStorage () {
  console.log('reset storage')
  clearCookie('access_token')
  clearCookie('token')
  clearCookie('userMobile')
  clearCookie('userName')
  localStorageRemove()
  store.commit('SET_LANG', 'zh')
}
