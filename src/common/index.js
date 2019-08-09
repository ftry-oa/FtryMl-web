
window.utils = window.utils || {}
window.utils.load = (url, type = 'js') => {
  if (!url) {
    return
  }
  const version = $('#cur-version').val()
  if (url.indexOf('?') === -1) {
    url += `?version=${version}`
  } else {
    url += `&version=${version}`
  }
  if (type === 'css') {
    const linkEle = document.createElement('link')
    linkEle.rel = 'stylesheet'
    linkEle.type = 'text/css'
    linkEle.href = url
    document.getElementsByTagName('head')[0].appendChild(linkEle)
    linkEle.onload = () => {
      console.log('loaded css')
    }
    return
  }
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'jquery.js'
  document.getElementsByTagName('head')[0].appendChild(script)

  script.onload = () => {
    console.log('loaded js')
  }
}

$(document).ready(function () {
  // debugger
  if (window.utils.isMobile) {
    $('body').addClass('mobile-body')
    // window.utils.load('./less/mobile.css', 'css')
  } else {
    // window.utils.load('./less/style.css', 'css')
  }
  // window.utils.load('./lib/less.js')
})