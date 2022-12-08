const fs = require('fs');
const path = require('path');
const { isDir } = require('./util/isDir');
const firstCaseUpper = require('./util/firstCaseUpper');
const fillFileName = require('./util/fillFileName');
const genSvgIconTpl = require('./tpl/genSvgIconTpl');
const delDir = require('./util/delDir');
const { svgAssetsPath, svgIconOutputPath } = require('./config/bin.config');
const { mkdirsSync } = require('./util/makdirs');

const componentRoot = svgIconOutputPath;

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
  await isDir(svgAssetsPath);

  if (fs.existsSync(componentRoot)) {
    delDir(componentRoot);
  }
  mkdirsSync(componentRoot);

  const files = fs.readdirSync(svgAssetsPath);

  files.forEach((filename) => {
    try {
      createIconSvgFile(filename);
    } catch (e) {
      console.log(`genSvgComponent ${filename} Error`, e);
    }
  });
})();
