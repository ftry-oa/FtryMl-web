const path = require('path')
const fs = require('fs')

const utils = require('./utils')
const config = require('../config')

const dest = '../dist'
const src = '../src'

const getFiles = (dir) => {
  let files = []
  const tempFiles = fs.readdirSync(path.resolve(__dirname, dir))
  tempFiles.forEach((fileItemName) => {
    const curFileName = path.join(dir, fileItemName)
    const fileItemPath = path.resolve(__dirname, curFileName)
    const stat = fs.statSync(fileItemPath)
    if (stat.isDirectory()) {
      let subFiles = getFiles(curFileName)
      subFiles = subFiles.map((subItem) => {
        return fileItemName + path.sep + subItem
      })
      files = files.concat(...subFiles)
      return
    }
    files.push(fileItemName)
  })
  return files
}

const writeFile = (filePath, src, dest) => {
  const absoulteFilePath = path.resolve(__dirname, src, filePath)
  let data = fs.readFileSync(absoulteFilePath, 'binary')
  data = utils.replace(data, config)
  fs.writeFileSync(path.resolve(__dirname, dest, filePath), data)
}

const files = getFiles(src)

files.forEach((item) => {
  writeFile(item, src, dest)
})