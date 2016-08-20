const styleNameIndex = {};

export default (styleNamePropertyValue: string, allowMultiple: boolean): Array<string> => {
    let styleNames;

    if (styleNameIndex[styleNamePropertyValue]) {
        styleNames = styleNameIndex[styleNamePropertyValue];
    } else {
        styleNames = styleNamePropertyValue.trim().split(' ').filter(e => !!e);

        styleNameIndex[styleNamePropertyValue] = styleNames;
    }

    if (allowMultiple === false && styleNames.length > 1) {
        throw new Error('ReactElement styleName property defines multiple module names ("' + styleNamePropertyValue + '").');
    }

    return styleNames;
};
