const assert = require('assert')
const mapper = require('../')

describe('Basic', () => {
  it('map to string', () => {
    mapper.configure({
      '*.js': 'js/[filename]'
    })

    const result = mapper([
      'a.js'
    ])

    assert.equal(result['a.js'], 'js/a.js')
  })

  it('map to function', () => {
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

  it('empty dirname', () => {
    mapper.configure({
      '*.png': 'images/[dirname][filename]'
    })

    assert.equal(mapper('a.png'), 'images/a.png')
  })

  it('accept string', () => {
    assert.equal(mapper('b.js'), 'b.js')
  })

  it('wrong param', () => {
    assert.equal(mapper(1), false)
  })
})
