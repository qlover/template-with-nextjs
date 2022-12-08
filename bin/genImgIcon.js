const {
  imgIconAssetsPath,
  imgIconAssetsOutputPath,
} = require('./config/bin.config');
const { mkdirsSync } = require('./util/makdirs');
const delDir = require('./util/delDir');
const { readdirSync, existsSync, writeFileSync } = require('fs');
const { isDir } = require('./util/isDir');
const { join } = require('path');
const { genIndexTpl, getLessTpl } = require('./tpl/imgIconTpl');

function genTypes(filenames) {
  console.log('filenames', filenames);
  return filenames.map((file) => {
    const type = file.split('.').slice(0, -1).join('.');
    return {
      filename: file,
      type: type,
    };
  });
}

(async function genImgIcon(params) {
  const files = readdirSync(imgIconAssetsPath);

  if (existsSync(imgIconAssetsOutputPath)) {
    delDir(imgIconAssetsOutputPath);
  }
  mkdirsSync(imgIconAssetsOutputPath);

  const fliesObjs = genTypes(files); // `'type1' | 'type2'`;

  const types = fliesObjs
    .map((item) => {
      return `'${item.type}'`;
    })
    .join(' | ');

  console.log('fliesObjs', fliesObjs);

  // 生成 index.tsx
  writeFileSync(join(imgIconAssetsOutputPath, 'index.tsx'), genIndexTpl(types));
  // 生成 index.module.less
  writeFileSync(
    join(imgIconAssetsOutputPath, 'index.module.less'),
    getLessTpl(fliesObjs)
  );
})();
