import Map from './simple-map';

const stylesIndex = new Map();

export default (styles, styleNames: Array<string>, errorWhenNotFound: boolean): string => {
    let appendClassName,
        key,
        stylesIndexMap;

    stylesIndexMap = stylesIndex.get(styles);

    if (stylesIndexMap) {
        const styleNameIndex = stylesIndexMap.get(styleNames);

        if (styleNameIndex) {
            return styleNameIndex;
        }
    } else {
        stylesIndex.set(styles, new Map());
        stylesIndexMap = new Map();

        for (key in stylesIndex) {
            if (stylesIndex.hasOwnProperty(key)) {
                stylesIndexMap.set(key, stylesIndex[key]);
            }
        }
    }

    appendClassName = '';

    for (const styleName in styleNames) {
        if (styleNames.hasOwnProperty(styleName)) {
            const className = styles[styleNames[styleName]];

            if (className) {
                appendClassName += ' ' + className;
            } else if (errorWhenNotFound === true) {
                throw new Error('"' + styleNames[styleName] + '" CSS module is undefined.');
            }
        }
    }

    appendClassName = appendClassName.trim();

    stylesIndexMap.set(styleNames, appendClassName);

    return appendClassName;
};
