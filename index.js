var onload = require('on-load')
var hasWindow = typeof window !== 'undefined'

function PicoComponent () {
  var self = this
  var element = null
  var connected = false
  var connectCallback = this.connect
  var disconnectCallback = this.disconnect

  Object.defineProperty(this, 'el', {
    get: function () {
      return element
    },
    set: function (newElement) {
      element = newElement
      if (hasWindow && !connected && (connectCallback || disconnectCallback)) {
        onload(element, connect, disconnect, this)
      }
    }
  })

  function connect () {
    connected = true
    if (connectCallback) {
      window.requestAnimationFrame(connectCallback.bind(self))
    }
  }

  function disconnect () {
    connected = false
    if (disconnectCallback) {
      window.requestAnimationFrame(disconnectCallback.bind(self))
    }
  }
}

PicoComponent.prototype.render = function render () {
  throw new Error('picocomponent: render should be implemented!')
}

module.exports = PicoComponent
module.exports.default = module.exports
