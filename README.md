# \<simple-chip\>

Web-component chip input

![](https://imgur.com/LXyfRqW.jpg)

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install the element's dependencies, then run `polymer serve` to serve the element locally.

## Interface

### Create 
```js
import ChipElement from 'simple-chip';
// Or use `<simple-chip>` and querySelector
const chip = new ChipElement();
document.appendChild(chip);
```

### Add chips
```js 
chip.addChips('by', 'parameters');
// or 
chip.addChips(['array', 'of', ['nested', 'items']]);
// or
let newChips = ['spread', 'syntax'];
chip.addChips(...newChips);
```

### Get chip values
```js
chip.values
// -> ['by', 'parameters', 'array', 'of', 'nested', 'items', 'spread', 'syntax']
```

### Get chip nodes
```js
chip.chips
// -> (8) [chip-element, chip-element, chip-element ... ]
```

### Listen for new chips added
Useful for validation
```js
chip.addEventListener('chip-added', (e) => {
    e.detail.text; // new chip text content

    // Cancel this chip adding
    e.preventDefault();
})
```

### Remove the last chip
```js
// Chip element is returned
const removed = chip.removeLast();
removed.value
// -> 'syntax'
```

### Remove specific chips
```js
const removeThese = chip.chips.filter(c => ['by', 'of'].includes(c.value));
for (const specific of removeThese) {
    specific.remove();
}

chip.values
// -> ['parameters', 'array', 'nested', 'items', 'spread']
```

### Change the commit keys
Note that keys can be specified either by key or by keycode, for example `';'` is equivalent to `'Semicolon'`, and either `'b'` or `'KeyB'` works. However, since lists can be specified `' '` must be provided as `'Space'`.
```html
<!-- With the attribute ->
<simple-chip commitkeycode="Space">
```
or 
```js
// With the property
chip.commitKeycode = 'Insert';

// Both versions also take comma delimited lists
chip.commitKeycode = 'Enter, Tab, Space';
```

## Viewing the Element

```
$ polymer serve
```

## ~~Running Tests~~

Tests haven't been build yet, of course.. 

```
$ polymer test
```

This application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run it's test suite locally.
