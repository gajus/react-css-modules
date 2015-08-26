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
        moduleName,
        newChildren,
        newClassName,
        newProps;

    if (options.useModuleName) {
        moduleName = element.props.moduleName;

        options.includeOriginal = false;
    } else {
        moduleName = element.props.className;
    }

    if (moduleName) {
        newClassName = moduleName.split(' ');

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

        newClassName = newClassName.filter((className) => {
            return className.length;
        });

        newClassName = newClassName.join(' ');
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


    if (newClassName) {
        newProps = {
            className: newClassName
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
