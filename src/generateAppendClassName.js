import SimpleMap from './SimpleMap';

const CustomMap = typeof Map === 'undefined' ? SimpleMap : Map;

const stylesIndex = new CustomMap();

export default (styles, styleNames: Array<string>, handleNotFoundStyleName: "throw" | "log" | "ignore"): string => {
  let appendClassName;
  let stylesIndexMap;

  stylesIndexMap = stylesIndex.get(styles);

  if (stylesIndexMap) {
    const styleNameIndex = stylesIndexMap.get(styleNames);

    if (styleNameIndex) {
      return styleNameIndex;
    }
  } else {
    stylesIndexMap = new CustomMap();
    stylesIndex.set(styles, new CustomMap());
  }

  appendClassName = '';

  for (const styleName in styleNames) {
    if (styleNames.hasOwnProperty(styleName)) {
      const className = styles[styleNames[styleName]];

      if (className) {
        appendClassName += ' ' + className;
      } else {
        if (handleNotFoundStyleName === 'throw') {
          throw new Error('"' + styleNames[styleName] + '" CSS module is undefined.');
        }
        if (handleNotFoundStyleName === 'log') {
          // eslint-disable-next-line no-console
          console.warn('"' + styleNames[styleName] + '" CSS module is undefined.');
        }
      }
    }
  }

  appendClassName = appendClassName.trim();

  stylesIndexMap.set(styleNames, appendClassName);

  return appendClassName;
};
