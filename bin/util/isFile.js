const fs = require('fs');

function isFile(path) {
  return new Promise((reslove, reject) => {
    fs.stat(path, function (err, stats) {
      if (err) {
        reject(err);
        return;
      }

      if (stats.isFile()) {
        reslove(stats);
        return;
      }
      reject();
    });
  });
}

function isFileAsync(path) {
  const stat = fs.statSync(path);
  if (stat.isDirectory()) {
    return stat;
  }
}

module.exports = { isFile, isFileAsync };
