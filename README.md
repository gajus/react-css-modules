# React CSS Modules

[![Travis build status](http://img.shields.io/travis/gajus/react-css-modules/master.svg?style=flat)](https://travis-ci.org/gajus/react-css-modules)
[![NPM version](http://img.shields.io/npm/v/react-css-modules.svg?style=flat)](https://www.npmjs.org/package/react-css-modules)

## Usage

First you need to setup [webpack](http://webpack.github.io/docs/) to load your css files using "css" loader and enable CSS modules. You will also need to use `extract-text-webpack-plugin` to construct the CSS file. Refer to [webpack-demo](https://github.com/css-modules/webpack-demo).

Then you need use the higher order component declaration pattern to encapsulate your component:

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

CSSModules component will look for CSS classes in `./car.css` that match `ReactElement` `className` and will extend the `className` declaration at the time of `render`.
