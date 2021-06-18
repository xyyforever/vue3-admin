/**
 * @desc 使用yarn start可以启动打包后的dist项目，查看打包好的文件
*/
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { spawn } = require('child_process')

/**
 * @desc 读取当前路径下的所有文件及文件夹
 */
const pathName = './'
fs.readdir(pathName, (err, files) => {
  const dirs = []
  !(function next(i) {
    if (i === files.length) {
      // console.log(dirs)
      dirs.forEach(v => console.dir(v))
      openDir()
      return
    } 
    fs.stat(path.join(pathName, files[i]), (err, data) => {     
      if (data.isDirectory() && ~files[i].indexOf('dist')) {               
        dirs.push(`构建目录：${files[i]}`)
      }
      next(i + 1)
    })
  })(0)
})


process.on('exit', (code) => {
  console.log(`exit的退出码: ${code}`)
})


/**
 * @desc 读取输入所要开启的目录
 */
function openDir() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '请输入开启目录> '
  })
  rl.prompt()
  rl.on('line', line => {
    console.warn(`你输入的是：'${line.trim()}'`)
    startServer(line.trim())
    // rl.close()
  }).on('close', () => {
    console.log(`readline进程退出`)
    process.exit(0)
  })
}

/**
 * @desc 开启live-server服务
 */
function startServer(dir) {
  const isWin32 = process.platform === 'win32'
  const child = spawn(isWin32 ? 'live-server.cmd' : 'live-server', {
    cwd: `./${dir}`
  })
  // stdout 获取标准输出
  child.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })
  // stderr 获取标准错误输出
  child.stderr.on('data', data => {
    console.error(`stderr: ${data}`)
  })
  child.on('close', code => {
    console.log(`子进程退出，退出码: ${code}`)
    downLiveServer()
  })
  child.on('error', code => {
    console.error(`子进程错误，错误码 ${code}`)
    downLiveServer()
    // process.exit(1)
  })
}

/**
 * @desc 安装live-server
*/
function downLiveServer() {
  const isWin32 = process.platform === 'win32'
  // const child = spawn(isWin32 ? 'npm.cmd' : 'npm', ['install', '-D', 'live-server'])
  const child = spawn(isWin32 ? 'yarn.cmd' : 'yarn', ['add', '-D', 'live-server'])
  child.stdout.on('data', data => {
    console.log(`live-server stdout: ${data}`)
  })
  child.stderr.on('data', data => {
    console.log(`live-server stderr: ${data}`)
  })
  child.on('close', code => {
    console.log(`live-server进程退出，退出码: ${code}`)
    process.exit(0)
  })
  child.on('error', code => {
    console.error(`live-server进程错误，错误码 ${code}`)
    process.exit(1)
  })
}
