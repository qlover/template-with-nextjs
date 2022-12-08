const fs = require('fs');
const path = require('path');
const getRootPath = require('./util/getRootPath');
const { isDir } = require('./util/isDir');
const firstCaseUpper = require('./util/firstCaseUpper');
const fillFileName = require('./util/fillFileName');
const genSvgIconTpl = require('./tpl/genSvgIconTpl');
const delDir = require('./util/delDir');

const componentRoot = getRootPath('src/components/core/Icon/AssetsSvgIcon');

function createIconSvgFile(filename) {
  const fileName = filename.replace('.svg', '');
  const componentName = firstCaseUpper(fileName);
  const componentFileName = fillFileName(componentName, '.tsx');
  const componentPath = path.join(componentRoot, componentFileName);

  if (fs.existsSync(componentPath)) {
    console.log('[exists]', componentPath);
  } else {
    console.log('[creteing]', componentPath);
    const filecontent = genSvgIconTpl(fileName, componentName);
    fs.writeFileSync(componentPath, filecontent);
    console.log('creted');
  }
}

(async function genSvgIconComponent(params) {
  const assetsRoot = getRootPath('src/assets/svgIcon');

  await isDir(assetsRoot);

  if (fs.existsSync(componentRoot)) {
    delDir(componentRoot);
  }
  fs.mkdirSync(componentRoot);

  const files = fs.readdirSync(assetsRoot);

  files.forEach((filename) => {
    try {
      createIconSvgFile(filename);
    } catch (e) {
      console.log(`genSvgComponent ${filename} Error`, e);
    }
  });
})();
