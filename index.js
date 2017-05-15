var onload = require('on-load')

function PicoComponent () {
  this._hasWindow = typeof window !== 'undefined'
  this._loaded = false
  this._element = null
}

PicoComponent.prototype.upgrade = function upgrade () {
  var self = this

  if (this._load || this._unload) {
    onload(
      this._element,
      function load (el) {
        self._loaded = true
        self._load && window.requestAnimationFrame(function () {
          self._load(el)
        })
      },
      function unload (el) {
        self._loaded = false
        self._unload && window.requestAnimationFrame(function () {
          self._unload(el)
        })
      },
      this
    )
  }

  return this._element
}

PicoComponent.prototype.update = function update () {
  if (
    (!this._element || !this._update) ||
    this._update.apply(this, arguments)
  ) {
    this._element = this._render.apply(this, arguments)
  }

  return this._element
}

PicoComponent.prototype.render = function render () {
  return this._hasWindow && this._loaded === false
    ? this.update.apply(this, arguments) && this.upgrade()
    : this.update.apply(this, arguments)
}

PicoComponent.prototype._render = function _render () {
  throw new Error('picocomponent: _render should be implemented!')
}

module.exports = PicoComponent
module.exports.default = module.exports
