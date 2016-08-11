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
      const dirname = path.dirname(file)
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

function mapper(files) {
  if (!Array.isArray(files)) {
    throw new Error(`mapper required a array, but received ${typeof files}`)
  }

  return files.reduce((result, file) => {
    result[file] = tweak(file)

    return result
  }, {})
}

mapper.configure = function(config, reset) {
  if (reset) {
    _config = config
  } else {
    Object.assign(_config, config)
  }
}

module.exports = mapper
