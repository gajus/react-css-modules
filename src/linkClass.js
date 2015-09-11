import React from 'react';
import makeConfiguration from './makeConfiguration';
import _ from './utils';

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

    if (_.isArray(element.props.children) || React.isValidElement(element.props.children)) {
        childrenCount = React.Children.count(element.props.children);

        // console.log('childrenCount', childrenCount, 'element.props.children', element.props.children);

        if (childrenCount > 1 || _.isArray(element.props.children)) {
            newChildren = React.Children.map(element.props.children, (node) => {
                if (React.isValidElement(node)) {
                    return linkClass(node, styles, configuration);
                } else {
                    return node;
                }
            });
            // https://github.com/facebook/react/issues/4723#issuecomment-135555277
            // Forcing children into an array produces the following error:
            // Warning: A ReactFragment is an opaque type. Accessing any of its properties is deprecated. Pass it to one of the React.Children helpers.
            // newChildren = _.values(newChildren);
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
