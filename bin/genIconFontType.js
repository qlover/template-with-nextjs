const { default: axios } = require('axios');
const { writeFileSync } = require('fs');
const { join } = require('path');
const { rootPath, iconFontCssUrl } = require('./config/bin.config');
const classNamesReg = /(\.?([a-zA-Z0-9-])+(:before))/g;

function createIconFont(types) {
  writeFileSync(
    join(rootPath, 'src/components/core/Icon/Iconfont/index.tsx'),
    `import appConfig from '@/config/appConfig';
import { createFromIconfontCN } from '@ant-design/icons';

export type IconFontType = ${types};

/**
 * 借用 antd createFromIconfontCN 创建的 iconfont.cn 上的字体图标
 */
const Iconfont = createFromIconfontCN<IconFontType>({
  scriptUrl: appConfig.iconFont,
});

export default Iconfont;
`
  );
}

(async function genIconFontType(params) {
  axios(iconFontCssUrl).then((cssText) => {
    const cssTextStr = cssText.data;
    if (typeof cssTextStr === 'string') {
      const iconTypes = cssTextStr
        .match(classNamesReg)
        .map((className) => {
          return "'" + className.replace('.', '').replace(':before', '') + "'";
        })
        .join(' | ');
      createIconFont(iconTypes);

      console.log('[genIconFontType] success');
    }
  });
})();
