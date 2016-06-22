import _ from 'lodash';

const styleNameIndex = {};

export default (styleNamePropertyValue: (string|array), allowMultiple: boolean): Array<string> => {
    let styleNames;
    let isArray = Array.isArray(styleNamePropertyValue)

    if (!isArray && styleNameIndex[styleNamePropertyValue]) {
        styleNames = styleNameIndex[styleNamePropertyValue];
    } else {
        styleNames = isArray
            ? styleNamePropertyValue.filter(styleNameItem => typeof styleNameItem === 'string')
            : _.trim(styleNamePropertyValue).split(' ');
        styleNames = _.filter(styleNames);

        styleNameIndex[styleNamePropertyValue] = styleNames;
    }

    if (allowMultiple === false && styleNames.length > 1) {
        throw new Error('ReactElement styleName property defines multiple module names ("' + styleNamePropertyValue + '").');
    }

    return styleNames;
};
