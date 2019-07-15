const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

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

// 目录存在不做处理，目录不存在，则创建
const handleDir = (dest, filePath) => {
  const destPath = path.resolve(__dirname, dest)

  let parentDirs = filePath.split(path.sep)
  parentDirs.splice(parentDirs.length - 1, 1)
  parentDirs.unshift('')

  let tempPath = destPath
  parentDirs.forEach((dirItem) => {
    tempPath = path.join(tempPath, path.sep + dirItem)
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath)
      console.log('mkdir', tempPath)
    }
  })
}

const writeFile = (filePath, src, dest) => {
  const absoulteFilePath = path.resolve(__dirname, src, filePath)
  let data = fs.readFileSync(absoulteFilePath, 'binary')
  data = utils.replace(data, config)
  handleDir(dest, filePath)
  fs.writeFileSync(path.resolve(__dirname, dest, filePath), data)
}

const files = getFiles(src)

const destPath = path.resolve(__dirname, dest)

rimraf(destPath, (err) => {
  if (err) {
    console.log('rimraf:', err)
    return
  }
  files.forEach((item) => {
    writeFile(item, src, dest)
  })
})