var onload = require('on-load')
var hasWindow = typeof window !== 'undefined'

function PicoComponent () {
  var self = this
  var element = null
  var loaded = false

  Object.defineProperty(this, 'el', {
    get: function () {
      return element
    },
    set: function (newElement) {
      element = newElement
      if (hasWindow && !loaded && (this.load || this.unload)) {
        onload(element, load, unload, this)
      }
    }
  })

  function load (el) {
    loaded = true
    self.load && window.requestAnimationFrame(function () {
      self.load(el)
    })
  }

  function unload (el) {
    loaded = false
    self.unload && window.requestAnimationFrame(function () {
      self.unload(el)
    })
  }
}

PicoComponent.prototype.render = function render () {
  throw new Error('picocomponent: render should be implemented!')
}

module.exports = PicoComponent
module.exports.default = module.exports
