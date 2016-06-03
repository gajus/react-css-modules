import _ from 'lodash';

export default (defaultStyles: Object, styles: Object) => {
    let mergedStyles = _.assign({}, defaultStyles);

    for (const p in mergedStyles) {
        if (!mergedStyles.hasOwnProperty(p)) {
            continue;
        }
        if (styles[p]) {
            mergedStyles[p] += ' ' + styles[p];
        }
    }

    return mergedStyles;
}
