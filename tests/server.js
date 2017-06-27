var PicoComponent = require('../')
var Test = require('./component')
var test = require('tape')

test('notify "_render" requirement', function (t) {
  t.plan(1)
  var c = new PicoComponent()
  t.throws(c.render.bind(c))
})

test('basic server', function (t) {
  t.plan(4)

  function Server () {
    Test.call(this)
  }

  Server.prototype = Object.create(Test.prototype)

  Server.prototype._load = function () {
    t.fail('load called')
  }

  Server.prototype._unload = function () {
    t.fail('unload called')
  }

  Server.prototype._update = function () {
    t.ok(true, 'update called')
    return true
  }

  var c = new Server()

  t.equal(c._hasWindow, false, 'no window')
  t.equal(c.render().toString(), '<div></div>', 'renders template')
  t.equal(c.render('test').toString(), '<div>test</div>', 'updates template')
})
