var PicoComponent = require('../')
var html = require('bel')

function Test (opts) {
  PicoComponent.call(this)
}

Test.prototype = Object.create(PicoComponent.prototype)

Test.prototype._render = function render (text) {
  return html`<div>${text}</div>`
}

module.exports = Test
