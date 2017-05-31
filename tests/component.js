var PicoComponent = require('../')
var html = require('bel')

function Test (opts) {
  PicoComponent.call(this)
  this._testLoad = opts.load
  this._testUnload = opts.unload
  this._testUpdate = opts.update
}

Test.prototype = Object.create(PicoComponent.prototype)

Test.prototype._load = function load () {
  this._testLoad.apply(this, arguments)
}

Test.prototype._unload = function load () {
  this._testUnload.apply(this, arguments)
}

Test.prototype._update = function update () {
  return this._testUpdate.apply(this, arguments)
}

Test.prototype._render = function render (text) {
  return html`<div>${text}</div>`
}

module.exports = Test
