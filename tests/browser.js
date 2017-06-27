var PicoComponent = require('../')
var Test = require('./component')
var test = require('tape')

test('notify "render" requirement', function (t) {
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

test('connect api', function (t) {
  t.plan(1)

  function Connect () {
    Test.call(this)
  }

  Connect.prototype = Object.create(Test.prototype)

  Connect.prototype.connect = function () {
    t.ok(true, 'connect called')
  }

  var c = new Connect()
  var el = c.render('test')

  document.body.appendChild(el) // trigger connect callback
})

test('disconnect api', function (t) {
  t.plan(1)

  function Disconnect () {
    Test.call(this)
  }

  Disconnect.prototype = Object.create(Test.prototype)

  Disconnect.prototype.disconnect = function () {
    t.ok(true, 'disconnect called')
  }

  var c = new Disconnect()
  var el = c.render('test')

  document.body.appendChild(el) // trigger connect

  document.body.innerHTML = '' // trigger disconnect
})
