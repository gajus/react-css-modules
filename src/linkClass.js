import React from 'react';

let linkClass;

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {CSSModules~Options} options
 * @return {ReactElement}
 */
linkClass = (element, styles = {}, options = {}) => {
    let childrenCount,
        clonedElement,
        moduleNames,
        newChildren,
        newProps,
        appendClassName;

    moduleNames = element.props.moduleName;

    if (moduleNames) {
        moduleNames = moduleNames.split(' ');

        if (options.allowMultiple === false && moduleNames.length > 1) {
            throw new Error(`ReactElement moduleName property defines multiple module names ("${element.props.moduleName}").`);
        }

        appendClassName = moduleNames.map((moduleName) => {
            if (styles[moduleName]) {
                return styles[moduleName];
            } else {
                if (options.errorWhenNotFound === true) {
                    throw new Error(`"${moduleName}" CSS module is undefined.`);
                }

                return '';
            }
        });

        appendClassName = appendClassName.filter((className) => {
            return className.length;
        });

        appendClassName = appendClassName.join(' ');
    }

    // A child can be either an array, a sole object or a string.
    // <div>test</div>
    if (typeof element.props.children !== 'string') {
        childrenCount = React.Children.count(element.props.children);

        if (childrenCount > 1) {
            newChildren = React.Children.map(element.props.children, (node) => {
                if (React.isValidElement(node)) {
                    return linkClass(node, styles, options);
                } else {
                    return node;
                }
            });
        } else if (childrenCount === 1) {
            newChildren = linkClass(React.Children.only(element.props.children), styles, options);
        }
    }


    if (appendClassName) {
        if (element.props.className) {
            appendClassName = element.props.className + ' ' + appendClassName;
        }

        newProps = {
            className: appendClassName
        };
    }

    if (newChildren) {
        clonedElement = React.cloneElement(element, newProps, newChildren);
    } else {
        clonedElement = React.cloneElement(element, newProps);
    }

    return clonedElement;
};

export default linkClass;
