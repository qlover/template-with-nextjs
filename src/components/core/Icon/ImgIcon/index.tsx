import domData from '@/utils/client/domData';
import classNames from 'classnames';
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';
import css from './index.module.less';

export type ImgIconType = 'android' | 'arrow_hover' | 'checked';

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
      className={classNames(css['ImgIcon'], css['ImgIcon-' + type], className)}
    ></i>
  );
}

  