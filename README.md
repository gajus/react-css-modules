# react-css-modules

`index.css`:

```css
.foo {
    color: #f00;
}
```

`Rainbow.js`:

```js
import React from 'react';
import styles from './index.css';
import CSSModules from 'react-css-modules';

class Rainbow extends React.Component {
    render () {
        return <div>
            <span className='foo'>I am rainbow!</span>
            <span className='bar'>I am rainbow!</span>
        </div>;
    }
}

export default CSSModules(Rainbow, styles);
```

When used, this component will generate:

```html
<div data-reactid=".0">
    <div data-reactid=".0.0">
        <span class="foo index__foo___1fSgh" data-reactid=".0.0.0">I am rainbow!</span>
        <span class="bar" data-reactid=".0.0.1">I am rainbow!</span>
    </div>
</div>
```
