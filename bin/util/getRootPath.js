const path = require('path');

module.exports = function getRootPath(pathname) {
  return path.join(__dirname, '../../', pathname);
};
