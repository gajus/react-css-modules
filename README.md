# React CSS Modules

[![Travis build status](http://img.shields.io/travis/gajus/react-css-modules/master.svg?style=flat)](https://travis-ci.org/gajus/react-css-modules)
[![NPM version](http://img.shields.io/npm/v/react-css-modules.svg?style=flat)](https://www.npmjs.org/package/react-css-modules)

Seamless CSS modules for React.

## What's the Problem?

[CSS modules](https://github.com/css-modules/css-modules) are awesome. If you are not familiar with CSS modules, it is a concept of using a module bundler such as [webpack](http://webpack.github.io/docs/) to load CSS scoped to a particular document. CSS modules loader will generate a unique name for a each CSS class at the time of loading the CSS. Refer to [webpack-demo](https://css-modules.github.io/webpack-demo/) for a full example.

In the context of React, this looks like this:

```js
import React from 'react';
import styles from './car.css';

export default class Car extends React.Component {
    render () {
        return <div className={styles.car}>
            <div className={styles.frontDoor}></div>
            <div className={styles.backDoor}></div>
        </div>;
    }
}
```

Awesome!

However, this approach has several disadvantages:

* You have to use `camelCael` CSS class names.
* You have to use `styles` object whenever constructing a `className`.

React CSS Modules enables seamless CSS modules for React, e.g.

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

`CSSModules` extends `Car` `render` method. It will look for CSS classes in `./car.css` that match CSS class names in `ReactElement` `className` and will replace/append the matching unique class names to `className` declaration.

Refer to the [react-css-modules-examples](https://github.com/gajus/react-css-modules-examples) repository for a complete usage example.

Awesome!

## Usage

```js
/**
 * @typedef CSSModules~Options
 * @property {Boolean} allowMultiple Determines whether `className` can have multiple class names. Throws an error when the constrained is not met. Default: true.
 * @property {Boolean} keepOriginal Determines whether the original `className` value is kept in addition to the appended CSS modules styles CSS class name. Default: true.
 * @property {Boolean} errorNotFound Determines whether an error is raised if `className` defines a CSS class(es) that is not present in the CSS modules styles. Default: false.
 */

/**
 * @param {ReactClass} Component
 * @param {Object} styles CSS modules class map.
 * @param {CSSModules~Options} options
 * @return {ReactClass}
 */
```

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

## SASS, SCSS, LASS and other CSS Preprocessors

[ICSS](https://github.com/css-modules/icss) works with CSS Preprocessors. All you need is to add the preprocessor the chain of loaders, e.g. in the case of webpack it is as simple as install `sass-loader` and adding `!sass` to the end of the `style-loader` loader chain declaration (loaders are processed from right to left):

```js
{
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass')
}
```

## Multiple CSS Classes

CSS modules promote composition pattern, i.e. every CSS class thats is used in a component should define all properties required to describe the element, e.g.

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

Using React CSS Modules, you can map as many CSS classes to the element as you want. `CSSModules` will append the unique class name for every class name it matches in the `className` declaration, e.g.

```css
.button {

}

.active {

}
```

```js
<div className='button active'></div>
```

This will map both [ICSS](https://github.com/css-modules/icss) classes to the target element.

However, I encourage you to use composition whenever possible. Composition promotes better separation of markup from style sheets using semantics that would be hard to achieve without CSS modules. You can enforce one CSS class name per `className` using [`allowMultiple` option](#usage).
