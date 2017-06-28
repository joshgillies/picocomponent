var PicoComponent = require('../')
var html = require('bel')

function Test (opts) {
  PicoComponent.call(this)
}

Test.prototype = Object.create(PicoComponent.prototype)

Test.prototype.render = function render (text) {
  this.el = html`<div>${text}</div>`
  return this.el
}

module.exports = Test
