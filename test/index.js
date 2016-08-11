const assert = require('assert')
const mapper = require('../')

describe('Basic', () => {
  it('string', () => {
    mapper.configure({
      '*.js': 'js/[filename]'
    })

    const result = mapper([
      'a.js'
    ])

    assert.equal(result['a.js'], 'js/a.js')
  })

  it('function', () => {
    mapper.configure({
      'style/*.css': (dirname, filename) => `css/${filename}`
    })

    const result = mapper([
      'style/a.css'
    ])

    assert.equal(result['style/a.css'], 'css/a.css')
  })

  it('configure reset', () => {
    mapper.configure({
      '*.html': 'html/[filename]'
    }, true)

    const result = mapper([
      'a.js', 'a.html'
    ])

    assert.equal(result['a.js'], 'a.js')
    assert.equal(result['a.html'], 'html/a.html')
  })

  it('require array', () => {
    assert.throws(() => {
      mapper('test')
    }, (error) => {
      if (error instanceof Error && /mapper required a array/.test(error)) {
        return true
      }
    })
  })
})
