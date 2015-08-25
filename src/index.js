import React from 'react';
import ReactDOM from 'react-dom';
import isArray from 'lodash/lang/isArray';

let unfreeze;

/**
 * Naive implementation of a method to unfreeze an object.
 *
 * @param {Object} source Frozen object.
 * @return {Object}
 */
unfreeze = (source) => {
    let property,
        target;

    target = {};

    for (property in source) {
        target[property] = source[property];
    }

    return target;
};

/**
 * @param {ReactClass} Target
 * @return {ReactClass}
 */
export default (Target, styles) => {
    let linkClass;

    /**
     * @param {ReactElement} element
     * @return {ReactElement}
     */
    linkClass = (element) => {
        let isFrozen;

        if (Object.isFrozen && Object.isFrozen(element)) {
            isFrozen = true;

            // https://github.com/facebook/react/blob/v0.13.3/src/classic/element/ReactElement.js#L131
            element = unfreeze(element);
            element.props = unfreeze(element.props);
        }

        if (element.props.className) {
            element.props.className = element.props.className.split(' ').map((className) => {
                if (styles[className]) {
                    return `${className} ${styles[className]}`;
                } else {
                    return className;
                }
            }).join(' ');
        }

        if (isArray(element.props.children)) {
            element.props.children = element.props.children.map((node) => {
                // React.isValidElement
                if (node instanceof element.constructor) {
                    return changeClass(node);
                } else {
                    return node;
                }
            });
        }

        if (isFrozen) {
            Object.freeze(element);
            Object.freeze(element.props);
        }

        return element;
    };

    return class CSSModules extends React.Component {
        render () {
            let test;

            test = <div>
                <div className='foo'>Foo</div>
                <div className='bar'>Bar</div>
            </div>;

            // This works!
            return test;

            // Not sure how to make this work...
            // At this point I would need to use linkClass, but I cannot find a way to access
            // children of Target.
            return <Target ref='test' />;
        }
    }
};
