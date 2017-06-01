var PicoComponent = require('../')
var Test = require('./component')
var test = require('tape')

test('basic browser', function (t) {
  t.plan(7)
  var c = new Test({
    load: function () {
      t.ok(true, 'load called')
    },
    unload: function () {
      t.ok(true, 'unload called')
    },
    update: function () {
      t.ok(true, 'update called')
      return false
    }
  })
  var el = c.render('test')
  t.ok(c._hasWindow, 'has window')
  t.equal(el.nodeName, 'DIV', 'renders element')
  t.equal(el.innerText, 'test', 'renders content')
  el = c.render('testing') // trigger update
  t.equal(el.innerText, 'test', 'content unchanged')
  document.body.appendChild(el) // trigger load
  document.body.innerHTML = '' // trigger unload
})

test('notify "_render" requirement', function (t) {
  t.plan(1)
  var c = new PicoComponent()
  t.throws(c.render.bind(c))
})
