import React from 'react';
import makeConfiguration from './makeConfiguration';

let linkClass;

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {CSSModules~Options} userConfiguration
 * @return {ReactElement}
 */
linkClass = (element, styles = {}, userConfiguration) => {
    let appendClassName,
        childrenCount,
        clonedElement,
        configuration,
        newChildren,
        newProps,
        styleNames;

    configuration = makeConfiguration(userConfiguration);

    styleNames = element.props.styleName;

    if (styleNames) {
        styleNames = styleNames.split(' ');

        if (configuration.allowMultiple === false && styleNames.length > 1) {
            throw new Error(`ReactElement styleName property defines multiple module names ("${element.props.styleName}").`);
        }

        appendClassName = styleNames.map((styleName) => {
            if (styles[styleName]) {
                return styles[styleName];
            } else {
                if (configuration.errorWhenNotFound === true) {
                    throw new Error(`"${styleName}" CSS module is undefined.`);
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
                    return linkClass(node, styles, configuration);
                } else {
                    return node;
                }
            });
        } else if (childrenCount === 1) {
            newChildren = linkClass(React.Children.only(element.props.children), styles, configuration);
        }
    }


    if (appendClassName) {
        if (element.props.className) {
            appendClassName = `${element.props.className} ${appendClassName}`;
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
