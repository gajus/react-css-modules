import React from 'react';

export default function (version) {
  const major = version.split('.')[0];

  return parseInt(major, 10) < 15 ? React.createElement('noscript') : null;
}
