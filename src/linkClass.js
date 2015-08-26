import React from 'react';

let linkClass;

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {Object} options {@link https://github.com/gajus/react-css-modules#options}
 * @return {ReactElement}
 */
linkClass = (element, styles = {}, options = {}) => {
    let newProps,
        newClassName,
        newChildren,
        childrenCount;

    if (element.props.className) {
        newClassName = element.props.className.split(' ');

        if (options.allowMultiple === false && newClassName.length > 1) {
            throw new Error(`ReactElement defines multiple class names ("${element.props.className}") in className declaration.`);
        }

        newClassName = newClassName.map((className) => {
            if (!styles[className] && options.errorNotFound === true) {
                throw new Error(`"${className}" CSS class name is not found in CSS modules styles.`);
            }

            if (options.includeOriginal === false) {
                if (styles[className]) {
                    return styles[className];
                } else {
                    return '';
                }
            } else {
                if (styles[className]) {
                    return `${className} ${styles[className]}`;
                } else {
                    return className;
                }
            }
        });

        newClassName = newClassName.filter(function (className) {
            return className.length;
        });

        newClassName = newClassName.join(' ');
    }

    // A child can be either an array, a sole object or a string.
    // <div>test</div>
    if (typeof element.props.children !== 'string') {
        childrenCount = React.Children.count(element.props.children);

        if (childrenCount > 1) {
            newChildren = [];

            React.Children.forEach(element.props.children, (node) => {
                if (React.isValidElement(node)) {
                    newChildren.push(linkClass(node, styles));
                } else {
                    newChildren.push(node);
                }
            });

            // Do not use React.Children.map.
            // For whatever reason React render multiple children as an array, while
            // React.Children.map generates an object.

            /* newChildren = React.Children.map((node) => {
                if (React.isValidElement(node)) {
                    return linkClass(node, styles);
                } else {
                    return node;
                }
            }); */
        } else if (childrenCount === 1) {
            newChildren = linkClass(React.Children.only(element.props.children), styles);
        }
    }


    if (newClassName) {
        newProps = {
            className: newClassName
        };
    }

    if (newChildren) {
        element = React.cloneElement(element, newProps, newChildren);
    } else {
        element = React.cloneElement(element, newProps);
    }

    return element;
};

export default linkClass;
