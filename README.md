# React CSS Modules

[![Travis build status](http://img.shields.io/travis/gajus/react-css-modules/master.svg?style=flat)](https://travis-ci.org/gajus/react-css-modules)
[![NPM version](http://img.shields.io/npm/v/react-css-modules.svg?style=flat)](https://www.npmjs.org/package/react-css-modules)

## Usage

First you need to setup [webpack](http://webpack.github.io/docs/) to load your css files using "css" loader and enable CSS modules. You will also need to use `extract-text-webpack-plugin` to aggregate the CSS into a single file. Refer to [webpack-demo](https://github.com/css-modules/webpack-demo).

Then you need use the higher order component declaration pattern to "decorate" your component, e.g.

```js
import React from 'react';
import styles from './car.css';
import CSSModules from 'react-css-modules';

class Car extends React.Component {
    render () {
        return <div className='car'>
            <div className='front-door'></div>
            <div className='back-door'></div>
        </div>;
    }
}

export default CSSModules(Car, styles);
```

Thats it!

`CSSModules` extends `Car` `render` method. It will look for CSS classes in `./car.css` that match `ReactElement` `className` and will append the matching unique class names to `className` declaration.

Refer to the [react-css-modules-examples](https://github.com/gajus/react-css-modules-examples) repository for a complete usage example.

## Multiple CSS Classes

CSS modules promote composition pattern, i.e. every CSS class should define all properties required to describe the element, e.g.

```css
.button {

}

.active {
    composes: common;

    /* anything that only applies to active state of the button */
}

.disabled {
    composes: common;

    /* anything that only applies to disabled state of the button */
}
```

To learn more about composing CSS rules, I suggest reading Glen Maddern article about [CSS Modules](http://glenmaddern.com/articles/css-modules) and the official [CSS modules spec](https://github.com/css-modules/css-modules).

However, using React CSS Modules, you can map as many CSS classes to the element as you want. `CSSModules` will append the unique class name for every class name it matches in the `className` declaration, e.g.

```css
.button {

}

.active {

}
```

```js
<div className='button active'></div>
```

This will work as you'd expect.

## Options

|Name|Type|Description|Default|
|---|---|---|---|
|`allowMultiple`|`Boolean`|Determines weather `className` can have multiple class names.|`true`|
|`includeOriginal`|`Boolean`|Determines weather the original `className` value should be kept in addition to the appended generated value.|`true`|
