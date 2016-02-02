import _ from 'lodash';

export default (styles, styleNames: Array<string>, errorWhenNotFound: boolean): string => {
    let appendClassName;

    appendClassName = '';

    for (let styleName in styleNames) {
        let className;
        className = styles[styleNames[styleName]];

        if (className) {
            appendClassName += ' ' + className;
        } else if (errorWhenNotFound === true) {
            throw new Error('"' + styleNames[styleName] + '" CSS module is undefined.');
        }
    }

    return _.trim(appendClassName);
};
