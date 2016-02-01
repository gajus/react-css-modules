import _ from 'lodash';

export default (styles, styleNames: Array<string>, errorWhenNotFound: boolean): string => {
    let appendClassName;

    appendClassName = '';

    appendClassName = _.map(styleNames, (styleName) => {
        if (styles[styleName]) {
            return styles[styleName];
        } else {
            if (errorWhenNotFound === true) {
                throw new Error('"' + styleName + '" CSS module is undefined.');
            }

            return '';
        }
    });

    appendClassName = _.filter(appendClassName, 'length');

    appendClassName = appendClassName.join(' ');

    return appendClassName;
};
