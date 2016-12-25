import Immutable from 'immutable';

const CustomMap = Immutable.Map;

let stylesIndex = new CustomMap();

export default (styles, themes, styleNames: Array<string>, errorWhenNotFound: boolean): string => {
  let appendClassName;
  let stylesIndexMap;

  const styleNameIndex = stylesIndex.getIn([styles, themes, styleNames]);
  if (styleNameIndex) {
    return styleNameIndex;
  }
  
  appendClassName = '';

  for (const styleName in styleNames) {
    if (styleNames.hasOwnProperty(styleName)) {
      const key = styleNames[styleName];
      let className = themes[key];
      if (className == undefined) {
        className = styles[key];
      }
      
      if (className) {
        appendClassName += ' ' + className;
      } else if (errorWhenNotFound === true) {
        throw new Error('"' + styleNames[styleName] + '" CSS module is undefined.');
      }
    }
  }

  appendClassName = appendClassName.trim();

  stylesIndex = stylesIndex.setIn([styles, themes, styleNames], appendClassName);

  return appendClassName;
};
