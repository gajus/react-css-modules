# React CSS Modules

[![Travis build status](http://img.shields.io/travis/gajus/react-css-modules/master.svg?style=flat)](https://travis-ci.org/gajus/react-css-modules)
[![NPM version](http://img.shields.io/npm/v/react-css-modules.svg?style=flat)](https://www.npmjs.org/package/react-css-modules)

React CSS Modules implement automatic mapping of CSS modules. Every CSS class is assigned a local-scoped identifier with a global unique name. CSS Modules enable a modular and reusable CSS!

- [What's the Problem?](#whats-the-problem)
- [The Implementation](#theimplementation)
- [Usage](#usage)
    - [Module Bundler](#module-bundler)
        - [webpack](#webpack)
        - [Browserify](#browserify)
    - [Decorator](#decorator)
    - [Options](#options)
        - [`allowMultiple`](#allowmultiple)
        - [`errorWhenNotFound`](#errorwhennotfound)
- [SASS, SCSS, LESS and other CSS Preprocessors](#sass-scss-less-and-other-css-preprocessors)
- [Global CSS](#global-css)
- [Multiple CSS Classes](#multiple-css-classes)

## What's the Problem?

[CSS Modules](https://github.com/css-modules/css-modules) are awesome. If you are not familiar with CSS Modules, it is a concept of using a module bundler such as [webpack](http://webpack.github.io/docs/) to load CSS scoped to a particular document. CSS module loader will generate a unique name for a each CSS class at the time of loading the CSS document ([Interoperable CSS](https://github.com/css-modules/icss) to be precise). To see CSS Modules in practice, [webpack-demo](https://css-modules.github.io/webpack-demo/).

In the context of React, CSS Modules look like this:

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

Rendering the component will produce a markup similar to:

```js
<div class="car__car___32osj">
    <div class="car__front-door___2w27N">front-door</div>
    <div class="car__back-door___1oVw5">back-door</div>
</div>
```

and a corresponding CSS file that matches those CSS classes.

Awesome!

However, this approach has several disadvantages:

* You have to use `camelCase` CSS class names.
* You have to use `styles` object whenever constructing a `className`.
* Mixing CSS Modules and global CSS classes is cumbersome.
* Reference to an undefined CSS Module resolves to `undefined` without a warning.

React CSS Modules component automates loading of CSS Modules using `moduleName` property, e.g.

```js
import React from 'react';
import styles from './car.css';
import CSSModules from 'react-css-modules';

class Car extends React.Component {
    render () {
        return <div moduleName='car'>
            <div moduleName='front-door'></div>
            <div moduleName='back-door'></div>
        </div>;
    }
}

export default CSSModules(Car, styles);
```

Using `react-css-modules`:

* You are not forced to use the `camelCase` naming convention.
* You do not need to refer to the `styles` object every time you use a CSS Module.
* There is clear distinction between global CSS and CSS Modules, e.g.

```js
<div className='global-css' moduleName='local-module'></div>
```

* You are warned when `moduleName` refers to an undefined CSS Module ([`errorWhenNotFound`](#errorwhennotfound) option).
* You can enforce use of a single CSS module per `ReactElement` ([`allowMultiple`](#allowmultiple) option).

## The Implementation

`react-css-modules` extends `render` method of the target component. It will use the value of `moduleName` to look for CSS Modules in the associated styles object and will append the matching unique CSS class names to the `ReactElement` `className` property value.

[Awesome!](https://twitter.com/intent/retweet?tweet_id=636497036603428864)

## Usage

Setup consists of:

* Setting up a [module bundler](#modulebundler) to load the [Interoperable CSS](https://github.com/css-modules/icss).
* [Decorating](#decorator) your component using `react-css-modules`.

### Module Bundler

#### webpack

* Install [`style-loader`](https://www.npmjs.com/package/style-loader) and [`css-loader`](https://www.npmjs.com/package/css-loader).
* You need to use [`extract-text-webpack-plugin`](https://www.npmjs.com/package/extract-text-webpack-plugin) to aggregate the CSS into a single file.
* Setup `/\.css$/` loader:

```js
{
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
}
```

* Setup `extract-text-webpack-plugin` plugin:

```js
new ExtractTextPlugin('app.css', {
    allChunks: true
})
```

Refer to [webpack-demo](https://github.com/css-modules/webpack-demo) or [react-css-modules-examples](https://github.com/gajus/react-css-modules-examples) for an example of a complete setup.

#### Browserify

Refer to [`css-modulesify`](https://github.com/css-modules/css-modulesify).

### Decorator

```js
/**
 * @typedef CSSModules~Options
 * @see {@link https://github.com/gajus/react-css-modules#options}
 * @property {Boolean} allowMultiple
 * @property {Boolean} errorWhenNotFound
 */

/**
 * @param {Function} Component
 * @param {Object} styles CSS Modules class map.
 * @param {CSSModules~Options} options
 * @return {Function}
 */
```

You need to decorate your component using `react-css-modules`, e.g.

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

As the name implies, `react-css-modules` is compatible with the [ES7 decorators](https://github.com/wycats/javascript-decorators) syntax:

```js
import React from 'react';
import styles from './car.css';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class extends React.Component {
    render () {
        return <div className='car'>
            <div className='front-door'>front-door</div>
            <div className='back-door'>back-door</div>
        </div>;
    }
}
```

[Awesome!](https://twitter.com/intent/retweet?tweet_id=636497036603428864)

Refer to the [react-css-modules-examples](https://github.com/gajus/react-css-modules-examples) repository for an example of webpack setup.

### Options

Options are supplied as the third parameter to the `CSSModules` function.

```js
CSSModules(Component, styles, options);
```

or as a second parameter to the decorator:

```js
@CSSModules(styles, options);
```

#### `allowMultiple`

Default: `false`.

Allows multiple CSS Module names.

When `false`, the following will cause an error:

```js
<div moduleName='foo bar' />
```

#### `errorWhenNotFound`

Default: `true`.

Throws an error when `moduleName` cannot be mapped to an existing CSS Module.

## SASS, SCSS, LESS and other CSS Preprocessors

[Interoperable CSS](https://github.com/css-modules/icss) is compatible with the CSS Preprocessors. To use a preprocessor, all you need to do is add the preprocessor to the chain of loaders, e.g. in the case of webpack it is as simple as installing `sass-loader` and adding `!sass` to the end of the `style-loader` loader query (loaders are processed from right to left):

```js
{
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass')
}
```

## Global CSS

CSS Modules does not restrict you from using global CSS.

```css
:global .foo {

}
```

However, use global CSS with caution. With CSS Modules, there are only a handful of valid use cases for global CSS (e.g. [normalization](https://github.com/necolas/normalize.css/)).

## Multiple CSS Modules

CSS Modules promote composition pattern, i.e. every CSS Module that is used in a component should define all properties required to describe an element, e.g.

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

Composition promotes better separation of markup and style using semantics that would be hard to achieve without CSS Modules.

To learn more about composing CSS rules, I suggest reading Glen Maddern article about [CSS Modules](http://glenmaddern.com/articles/css-modules) and the official [spec of the CSS Modules](https://github.com/css-modules/css-modules).

That said, if you enable [`allowMultiple`](#allowmultiple) option, you can map multiple CSS Modules to a single `ReactElement`. `react-css-modules` will append a unique class name for every CSS Module it matches in the `moduleName` declaration, e.g.

```css
.button {

}

.active {

}
```

```js
<div moduleName='button active'></div>
```

This will map both [Interoperable CSS](https://github.com/css-modules/icss) CSS classes to the target element.
