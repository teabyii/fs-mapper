'use strict'

const path = require('path')
const minimatch = require('minimatch')

let _config = {}

function tweak(file) {
  const keys = Object.keys(_config)
  const len = keys.length
  let result = file

  for (let i = 0; i < len; i++) {
    let key = keys[i]

    if (minimatch(file, key)) {
      const filename = path.basename(file)
      let dirname = path.dirname(file)

      // For empty dirname.
      if (dirname === '.') {
        dirname = ''
      } else {
        dirname += path.sep
      }

      const replacer = _config[key]

      if (typeof replacer === 'string') {
        result = replacer
          .replace(/\[filename\]/g, filename)
          .replace(/\[dirname\]/g, dirname)
      }

      if (typeof replacer === 'function') {
        result = replacer(dirname, filename)
      }
    }
  }

  return result
}

function mapper(target) {
  if (Array.isArray(target)) {
    return target.reduce((result, file) => {
      result[file] = tweak(file)
      return result
    }, {})
  }

  if (typeof target === 'string') {
    return tweak(target)
  }

  return false
}

mapper.configure = function(config, reset) {
  if (reset) {
    _config = config
  } else {
    Object.assign(_config, config)
  }
}

module.exports = mapper
