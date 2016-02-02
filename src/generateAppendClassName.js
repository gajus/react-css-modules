import Map from 'es6-map';

let stylesIndex;

stylesIndex = new Map();

export default (styles, styleNames: Array<string>, errorWhenNotFound: boolean): string => {
    let appendClassName,
        styleName,
        stylesIndexMap;

    stylesIndexMap = stylesIndex.get(styles);

    if (stylesIndexMap) {
        let styleNameIndex;

        styleNameIndex = stylesIndexMap.get(styleNames);

        if (styleNameIndex) {
            return styleNameIndex;
        }
    } else {
        stylesIndexMap = stylesIndex.set(styles, new Map());
    }

    appendClassName = '';

    for (styleName in styleNames) {
        let className;

        className = styles[styleNames[styleName]];

        if (className) {
            appendClassName += ' ' + className;
        } else if (errorWhenNotFound === true) {
            throw new Error('"' + styleNames[styleName] + '" CSS module is undefined.');
        }
    }

    appendClassName = appendClassName.trim();

    stylesIndexMap.set(styleNames, appendClassName);

    return appendClassName;
};
