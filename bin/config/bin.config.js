const { join } = require('path');

const rootPath = join(__dirname, '../../');

module.exports = {
  /**
   * 项目根路径
   */
  rootPath: rootPath,

  /**
   * svg 图标 资产目录
   */
  svgAssetsPath: join(rootPath, 'src/assets/svgIcon'),

  /**
   * svg 图标输出目录
   */
  svgIconOutputPath: join(rootPath, 'src/components/core/Icon/AssetsSvgIcon'),
};
