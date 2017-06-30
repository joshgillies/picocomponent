var onload = require('on-load')
var hasWindow = typeof window !== 'undefined'

function PicoComponent () {
  var self = this
  var element = null
  var connected = false

  Object.defineProperty(this, 'el', {
    get: function () {
      return element
    },
    set: function (newElement) {
      element = newElement
      if (hasWindow && !connected && (this.connect || this.disconnect)) {
        onload(element, connect, disconnect, this)
      }
    }
  })

  function connect () {
    connected = true
    if (self.connect) {
      window.requestAnimationFrame(self.connect.bind(self))
    }
  }

  function disconnect () {
    connected = false
    if (self.disconnect) {
      window.requestAnimationFrame(self.disconnect.bind(self))
    }
  }
}

PicoComponent.prototype.render = function render () {
  throw new Error('picocomponent: render should be implemented!')
}

module.exports = PicoComponent
module.exports.default = module.exports
