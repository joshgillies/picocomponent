var PicoComponent = require('../')
var Test = require('./component')
var test = require('tape')

test('notify "render" requirement', function (t) {
  t.plan(1)
  var c = new PicoComponent()
  t.throws(c.render.bind(c))
})

test('basic server', function (t) {
  t.plan(2)

  function Server () {
    Test.call(this)
  }

  Server.prototype = Object.create(Test.prototype)

  Server.prototype.connect = function () {
    t.fail('connect called')
  }

  Server.prototype.disconnect = function () {
    t.fail('disconnect called')
  }

  var c = new Server()

  t.equal(c.render().toString(), '<div></div>', 'renders template')
  t.equal(c.render('test').toString(), '<div>test</div>', 'updates template')
})
