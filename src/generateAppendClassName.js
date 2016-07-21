import Map from './simple-map';

const stylesIndex = new Map();

export default (styles, styleNames: Array<string>, errorWhenNotFound: boolean): string => {
    let appendClassName,
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
        
        for (var p in stylesIndex) {
            stylesIndexMap.set(p, stylesInex[p]);
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
