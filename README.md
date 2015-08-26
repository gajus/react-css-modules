# React CSS Modules

[![Travis build status](http://img.shields.io/travis/gajus/react-css-modules/master.svg?style=flat)](https://travis-ci.org/gajus/react-css-modules)
[![NPM version](http://img.shields.io/npm/v/react-css-modules.svg?style=flat)](https://www.npmjs.org/package/react-css-modules)

Seamless mapping of class names to CSS modules inside of React components.

- [What's the Problem?](#whats-the-problem)
- [Usage](#usage)
    - [Options](#options)
        - [`allowMultiple`](#allowmultiple)
        - [`keepOriginal`](#keeporiginal)
        - [`errorNotFound`](#errornotfound)
- [SASS, SCSS, LESS and other CSS Preprocessors](#sass-scss-less-and-other-css-preprocessors)
- [Global CSS](#global-css)
- [Multiple CSS Classes](#multiple-css-classes)

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

Rendering the component will produce a markup similar to:

```js
<div class="car__car___32osj" data-reactid=".0.0">
    <div class="car__front-door___2w27N" data-reactid=".0.0.$=10:0">front-door</div>
    <div class="car__back-door___1oVw5" data-reactid=".0.0.$=11:0">back-door</div>
</div>
```

and a corresponding CSS file that matches those CSS classes.

Awesome!

However, this approach has several disadvantages:

* You have to use `camelCasel` CSS class names.
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

[Awesome!](https://twitter.com/intent/retweet?tweet_id=636497036603428864)

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

Then you need to decorate your component using `CSSModules`, e.g.

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

### Options

Options are supplied as the third parameter to the `CSSModules` function.

```js
CSSModules(Component, styles, options);
```

#### `allowMultiple`

Allows multiple CSS class names. Default: `true`.

When `false`, the following will cause an error:

```js
<div className='foo bar' />
```

#### `keepOriginal`

Keeps original CSS class name in addition to names of the CSS Modules. Default: `true`.

When `true`, the following `ReactElement`:

```js
<div className='foo bar' />
```

will be rendered with a `className` property "foo component__foo___2w27N bar component__bar__1oVw5".

#### `errorNotFound`

Throws an error when class name cannot be mapped to a CSS Module. Default: `false`.

## SASS, SCSS, LESS and other CSS Preprocessors

[ICSS](https://github.com/css-modules/icss) is compatible with the CSS Preprocessors. All you need is to add the preprocessor to the chain of loaders, e.g. in the case of webpack it is as simple as installing `sass-loader` and adding `!sass` to the end of the `style-loader` loader chain declaration (loaders are processed from right to left):

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

When using global CSS, you need to enable [`keepOriginal`](#keeporiginal) option.

Use global CSS with caution. With CSS Modules, there are only a handful of valid use cases for global CSS (e.g. [normalization](https://github.com/necolas/normalize.css/)).

## Multiple CSS Classes

CSS modules promote composition pattern, i.e. every CSS class that is used in a component should define all properties required to describe the element, e.g.

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

Using React CSS Modules, you can map as many CSS classes to the element as you want. `CSSModules` will append a unique class name for every class name it matches in the `className` declaration, e.g.

```css
.button {

}

.active {

}
```

```js
<div className='button active'></div>
```

This will map both [ICSS](https://github.com/css-modules/icss) CSS classes to the target element.

However, I encourage you to use composition whenever possible. Composition promotes better separation of markup from style sheets using semantics that would be hard to achieve without CSS modules. You can enforce one CSS class name per `className` using [`allowMultiple` option](#usage).
