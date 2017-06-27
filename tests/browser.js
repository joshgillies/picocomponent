var PicoComponent = require('../')
var Test = require('./component')
var test = require('tape')

test('notify "_render" requirement', function (t) {
  t.plan(1)
  var c = new PicoComponent()
  t.throws(c.render.bind(c))
})

test('render api', function (t) {
  t.plan(3)

  var c = new Test()
  var el = c.render('test')

  t.equal(el.nodeName, 'DIV', 'renders element')
  t.equal(el.innerText, 'test', 'renders content')

  el = c.render('testing') // trigger update

  t.equal(el.innerText, 'testing', 'content updated')
})

test('update api', function (t) {
  t.plan(2)

  function Update () {
    Test.call(this)
  }

  Update.prototype = Object.create(Test.prototype)

  Update.prototype._update = function () {
    t.ok(true, 'update called')
    return false
  }

  var c = new Update()
  var el = c.render('test')

  el = c.render('testing') // trigger update

  t.equal(el.innerText, 'test', 'content unchanged')
})

test('load api', function (t) {
  t.plan(1)

  function Load () {
    Test.call(this)
  }

  Load.prototype = Object.create(Test.prototype)

  Load.prototype._load = function () {
    t.ok(true, 'load called')
  }

  var c = new Load()
  var el = c.render('test')

  document.body.appendChild(el) // trigger load
})

test('unload api', function (t) {
  t.plan(1)

  function Unload () {
    Test.call(this)
  }

  Unload.prototype = Object.create(Test.prototype)

  Unload.prototype._unload = function () {
    t.ok(true, 'unload called')
  }

  var c = new Unload()
  var el = c.render('test')

  document.body.appendChild(el) // trigger load

  document.body.innerHTML = '' // trigger unload
})
