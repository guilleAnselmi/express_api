const express = require('express')
const Router = express.Router
const router = Router()
const glob = require('glob')
const path = require('path')
const options = {
  ignore: [`${__dirname}/_helpers.js`, `${__dirname}/index.js`]
}

glob
  .sync(path.join(__dirname, '/*.js'), options)
  .map(filename => {
    const arr = filename.split('/')
    let name = arr.pop()
    name = name.replace('.js', '')
    return {
      path: `/${name.toLowerCase()}`,
      router: require(`${filename.replace('.js', '')}`)
    }
  })
  .filter(obj => Object.getPrototypeOf(obj.router) === Router)
  .forEach(obj => router.use(obj.path, obj.router))

module.exports = router
