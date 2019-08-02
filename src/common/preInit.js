
window.utils = window.utils || {}
window.utils.isMobile = (() => {
  return !!navigator.userAgent.match (
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
})();

const _html = document.getElementsByTagName('html')[0]
if (window.utils.isMobile) {
  // todo
  const sw = document.body.clientWidth
  const fontSize = 100 * sw / 640
  _html.style.fontSize = `${fontSize}px`
} else {
  _html.style.fontSize = '100px'
}