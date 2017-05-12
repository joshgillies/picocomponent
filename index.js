var onload = require('on-load')

function PicoComponent () {
  this._hasWindow = typeof window !== 'undefined'
  this._loaded = false
  this._element = null
}

PicoComponent.prototype.render = function render () {
  var self = this

  if (
    this._element &&
    (this._update &&
    !this._update.apply(this, arguments))
  ) {
    return this._element
  }

  this._element = this._render.apply(this, arguments)

  if (
    this._hasWindow &&
    this._loaded === false &&
    (this._load || this._unload)
  ) {
    return onload(
      this._element,
      function load (el) {
        self._loaded = true
        window.requestAnimationFrame(function () {
          self._load(el)
        })
      },
      function unload (el) {
        self._loaded = false
        window.requestAnimationFrame(function () {
          self._unload(el)
        })
      },
      this
    )
  }

  return this._element
}

module.exports = PicoComponent
module.exports.default = module.exports
