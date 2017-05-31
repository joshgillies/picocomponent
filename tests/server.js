var PicoComponent = require('../')
var Test = require('./component')
var test = require('tape')

test('basic server', function (t) {
  t.plan(4)
  var c = new Test({
    load: function () {
      t.fail('load called')
    },
    unload: function () {
      t.fail('unload called')
    },
    update: function () {
      t.ok(true, 'update called')
      return true
    }
  })
  t.equal(c._hasWindow, false, 'no window')
  t.equal(c.render().toString(), '<div></div>', 'renders template')
  t.equal(c.render('test').toString(), '<div>test</div>', 'updates template')
})

test('notify "_render" requirement', function (t) {
  t.plan(1)
  var c = new PicoComponent()
  t.throws(c.render.bind(c))
})
