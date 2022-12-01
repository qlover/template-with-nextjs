// 创建本地 route 类型
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

const getRootPath = require('./getRootPath');

const whiteList = ['_app', '_local', '_document', 'api', '.less', '.css'];

function getDirPage(dir, level = 1) {
  const files = fs.readdirSync(dir);
  return files
    .filter((file) => {
      return !whiteList.some((name) => file.includes(name));
    })
    .map((file) => file.split('.').shift());
}

(async function main(params) {
  const dir = getRootPath('src/pages');
  const pages = getDirPage(dir, 1);
  console.log(pages);
})();
