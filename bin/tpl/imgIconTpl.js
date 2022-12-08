const { join } = require('path');
const {
  imgIconAssetsPath,
  imgIconAssetsSrcPath,
} = require('../config/bin.config');

/**
 *
 *
 * ```
 * 'type1' | 'type2'
 * ```
 *
 * @param {*} types 图片类型，用 | 分开
 * @returns
 */
function genIndexTpl(types) {
  return `import domData from '@/utils/client/domData';
import classNames from 'classnames';
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';
import css from './index.module.less';

export type ImgIconType = ${types};

export type ImgIconProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  type: ImgIconType;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};

export default function ImgIcon({
  width,
  height,
  type,
  className,
  style,
  ...props
}: ImgIconProps) {
  return (
    <i
      data-type={type}
      style={{ width, height, ...style }}
      {...domData.compoent(ImgIcon)}
      {...props}
      className={classNames(css['ImgIcon'], 'ImgIcon-' + type, className)}
    ></i>
  );
}

  `;
}

const rootStyle = `
.ImgIcon {
  font-size: 0;
  line-height: 1;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}`;

function genRule(filename, type) {
  return `
.ImgIcon-${type} {
  background-image: url(${imgIconAssetsSrcPath + '/' + filename});
}
`;
}

function getLessTpl(fliesObjs) {
  const rules = fliesObjs
    .map((item) => {
      return genRule(item.filename, item.type);
    })
    .join('\n');

  return rootStyle + '\n' + rules;
}

module.exports = { genIndexTpl, getLessTpl };
