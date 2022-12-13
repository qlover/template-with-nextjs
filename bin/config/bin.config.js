const { join } = require('path');

const rootPath = join(__dirname, '../../');

const svgAssetsSrcPath = '/assets/svgIcon';
const imgIconAssetsSrcPath = '/assets/imgIcon';
const componentRoot = join(rootPath, 'src/components');
module.exports = {
  /**
   * 项目根路径
   */
  rootPath: rootPath,
  componentRoot: componentRoot,

  svgAssetsSrcPath,

  /**
   * svg 图标 资产目录
   */
  svgAssetsPath: join(rootPath, 'src', svgAssetsSrcPath),

  /**
   * svg 图标输出目录
   */
  svgIconOutputPath: join(rootPath, 'src/components/core/Icon/AssetsSvgIcon'),

  imgIconAssetsSrcPath,

  /**
   * img 图标资产目录
   */
  imgIconAssetsPath: join(rootPath, 'src', imgIconAssetsSrcPath),

  /**
   * img 图标输出目录
   */
  imgIconAssetsOutputPath: join(rootPath, 'src/components/core/Icon/ImgIcon'),
};
