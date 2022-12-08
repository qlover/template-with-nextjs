const { isString } = require('lodash');

function firstCaseUpper(title) {
  if (isString(title) && title.length > 0) {
    return title.slice(0, 1).toUpperCase() + title.slice(1);
  }
  return title;
}

module.exports = firstCaseUpper;
