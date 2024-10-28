/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import fs from 'node:fs'
import { EOL } from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { toCamelCase, formatDate } from '@zx-libs/utils'

const parseArgs = (args) => {
  let arr
  return args.reduce((obj, arg) => {
    // --dir=dist,src
    arr = arg.match(/--([\w-]+)=(.+)/)
    if (arr) {
      obj[toCamelCase(arr[1])] = arr[2]
    }
    return obj
  }, {})
}

const getPackageJson = () => {
  const pkgRawData = fs.readFileSync(path.join(process.cwd(), 'package.json'))
  return JSON.parse(pkgRawData)
}

const getDefHeaderLines = (pkg) => {
  return [
    '/*!',
    ` * ${pkg.name} version ${pkg.version}`,
    ` * Author: ${pkg.author}`,
    ` * Homepage: ${pkg.homepage}`,
    ` * Released on: ${formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss (g)')}`,
    ` */`,
  ]
}

const VERSION = '__VERSION__'

const args = parseArgs(process.argv.slice(2))

/**
 * 添加头部信息和替换版本号
 * @param {*} filePath 
 * @param {*} param1 
 */
const prependHeadlinesAndReplaceVersion = (filePath, { prependLines, pkg }) => {
  const liens = fs.readFileSync(filePath, 'utf8').toString().replace(VERSION, pkg.version).split(EOL)
  fs.writeFileSync(filePath, [...prependLines, ...liens].join(EOL))
}

const _handle = (dirOrFile, options) => {
  if (!fs.existsSync(dirOrFile)) {
    throw new Error(`Directory or file ${dirOrFile} does not exist。`)
  }

  const prependLines = getDefHeaderLines(options.pkg)

  const stat = fs.statSync(dirOrFile)
  if (stat.isFile()) {
    prependHeadlinesAndReplaceVersion(dirOrFile, {
      ...options,
      prependLines,
    })
  } else if (stat.isDirectory()) {
    fs.readdirSync(dirOrFile).forEach((file) => {
      _handle(path.join(dirOrFile, file), options)
    })
  }
}

if (args.dir) {
  const dir = path.join(process.cwd(), args.dir)
  _handle(dir, {
    pkg: getPackageJson(),
  })
}