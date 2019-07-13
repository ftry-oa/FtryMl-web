const reg = /\$\{(\S+)\}/gi

const replace = (data, context) => {
  return data.replace(reg, (match, matchKey) => {
    return context[matchKey] || match
  })
}

module.exports = {
  replace,
}