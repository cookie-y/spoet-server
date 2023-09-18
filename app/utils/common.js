'use strict';

const { isArray, isObject } = require('lodash');
module.exports = {
  assignFilter: (object, source) => {
    for (const key in source) {
      if (!object[key]) {
        object[key] = source[key];
      }
      if (isArray(source[key])) {
        // attributes设置为数组时，以数组条件为主
        if (key === 'attributes') {
          object[key] = source[key];
        } else if (key === 'include') {
          object[key] = [ ...object[key], ...source[key] ];
        }
      } else if (isObject(object[key])) {
        object[key] = {
          ...object[key],
          ...source[key],
        };
      }
    }
    return object;
  },
};
