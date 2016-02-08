export default (styles, styleNames: Array<string>, errorWhenNotFound: boolean): string => {
    return styleNames.map(function (styleName) {
      if (styles[styleName]) {
        return styles[styleName];
      } else if (errorWhenNotFound === true) {
        throw new Error('"' + styleName + '" CSS module is undefined.');
      } else {
        return undefined;
      }
    }).join(' ').trim();
};
