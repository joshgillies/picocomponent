# picocomponent

[![Build Status][0]][1]
[![Standard - JavaScript Style Guide][2]][3]

> Teeny tiny component system :mag:

## Usage

```js
var PicoComponent = require('picocomponent')

function Button () {
  PicoComponent.call(this)
  this.el = document.createElement('button')
}

Button.prototype = Object.create(PicoComponent.prototype)

Button.prototype._render = function render (text) {
  this.el.innerText = text
  return this.el
}

var button = new Button()

document.body.appendChild(button.render('Hello world!'))
```

## FAQ

### Is this a joke?

It may seem tht way, but seriously this exists as a result of other component systems eg.
[`nanocomponent`][nano] being focused on producing components targeted at DOM morphing
libraries such as [`nanomorph`][nanomorph] and [`morphdom`][morph].
For this reason `picocomponent` aims to be more general purpose.

### Have you gone too far?

Probably.

## See also:

- [yoshuawuyts/nanocomponent][nano]
- [yoshuawuyts/microcomponent][micro]
- [yoshuawuyts/cache-element][cache-element]
- [hypermodules/cache-component][cache-component]

## License

MIT

[0]: https://travis-ci.org/joshgillies/picocomponent.svg?branch=master
[1]: https://travis-ci.org/joshgillies/picocomponent
[2]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[3]: http://standardjs.com/
[nano]: https://github.com/yoshuawuyts/nanocomponent
[micro]: https://github.com/yoshuawuyts/microcomponent
[cache-component]: https://github.com/hypermodules/cache-component
[cache-element]: https://github.com/yoshuawuyts/cache-element
[morph]: https://github.com/patrick-steele-idem/morphdom
[nanomorph]: https://github.com/yoshuawuyts/nanomorph
