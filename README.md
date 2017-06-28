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

Button.prototype.render = function render (text) {
  this.el.innerText = text
  return this.el
}

var button = new Button()

document.body.appendChild(button.render('Hello world!'))
```

## API

### `PicoComponent.prototype`

`PicoComponent` aims to provide a Class like interface for constructing components.

As a consumer you'll always want to extend the `PicoComponent.prototype` either via ES6 classes:

```js
class Component extends PicoComponent {
  // ...
}
```

or by extending the base `prototype`:

```js
function Component () {
  PicoComponent.call(this)
}

Button.prototype = Object.create(PicoComponent.prototype)
```

Instances of `PicoComponent` have the following internal properties:

- `this.el`: Used to manage the DOM node a component is responsible for. Defaults to `null`. See [How do I manage DOM nodes](#how-do-i-manage-dom-nodes) for more info.

### `PicoComponent.prototype.render(...args)`

You'll always want to implement a render function. This forms the public interface for your
component, and will generally leverage some templating library to manage rendering and updating
your component. Your `render` method should always return DOM nodes.

### `PicoComponent.prototype.connect()`

When assigned, the `connect` handler will be called once your component has been inserted into the DOM.

### `PicoComponent.prototype.disconnect()`

When assigned, the `disconnect` handler will be called once your component has been removed
from the DOM.

## FAQ

### Is this a joke?

It may seem that way, but seriously this exists as a result of other component systems eg.
[`nanocomponent`][nano] being focused on producing components targeted at DOM morphing
libraries such as [`nanomorph`][nanomorph] and [`morphdom`][morph].

For this reason `picocomponent` aims to be more general purpose, leaving DOM diffing strategies up to the consumer,
while still providing useful features such as `connect`/`disconnect` event listeners by integrating [`on-load`][on-load].

### How do I manage DOM nodes

As a matter of convention `PicoComponent` implements a custom getter/setter used for managing
the DOM node your component is responsible for.

When assigning a DOM node to your `PicoComponent` instance eg:

```js
class Button extends PicoComponent {
  constructor () {
    super()
    this.el = document.createElement('button')
  }
}
```

`PicoComponent` will ensure all appropriate lifecycle hooks are correctly assigned.

### Have you gone too far?

Eh.

## See also:

- [joshgillies/hypercomponent][hyper]
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
[hyper]: https://github.com/joshgillies/hypercomponent
[nano]: https://github.com/yoshuawuyts/nanocomponent
[micro]: https://github.com/yoshuawuyts/microcomponent
[cache-component]: https://github.com/hypermodules/cache-component
[cache-element]: https://github.com/yoshuawuyts/cache-element
[morph]: https://github.com/patrick-steele-idem/morphdom
[nanomorph]: https://github.com/yoshuawuyts/nanomorph
[on-load]: https://github.com/shama/on-load
