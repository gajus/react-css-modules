import _ from 'lodash';

export default (styleNamePropertyValue: string, allowMultiple: boolean): Array<string> => {
    let styleNames;

    styleNames = styleNamePropertyValue.split(' ');
    styleNames = _.filter(styleNames);

    if (allowMultiple === false && styleNames.length > 1) {
        throw new Error('ReactElement styleName property defines multiple module names ("' + styleNamePropertyValue + '").');
    }

    return styleNames;
};
