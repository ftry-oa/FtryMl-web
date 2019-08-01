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

module.exports = {
  replace,
  isProxyApi,
}