
const os = require('os')

const reg = /\$\{(\S+)\}/gi

const replace = (data, context) => {
  return data.replace(reg, (match, matchKey) => {
    return context[matchKey] || match
  })
}

const isProxyApi = (proxyMap, pathname) => {
  if (!proxyMap || !pathname) {
    return false
  }

  let target = null
  for (const key in proxyMap) {
    if (pathname.indexOf(key) !== -1 ) {
      target = proxyMap[key]
      break;
    }
  }

  return {
    data: !!target,
    target,
  }
}

///////////////////获取本机ip///////////////////////
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = {
  replace,
  isProxyApi,
  getIPAdress,
}