const { writeFile, writeFileSync } = require('fs');

function createFile(path, content) {
  return new Promise((reslove, reject) => {
    writeFile(path, content, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        reslove();
      }
    });
  });
}

module.exports = { createFile };
