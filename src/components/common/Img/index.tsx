/* eslint-disable @next/next/no-img-element */
import useCacheState from '@/hooks/common/useCacheState';
import { isString } from 'lodash';
import Image, { ImageProps } from 'next/image';

type TransformImage = (
  src: string,
  alt: string,
  title: string | null
) => string;
export type ImgProps = ImageProps & {
  transformImageUri?: TransformImage;

  /**
   * 是否使用 next image 组件
   */
  useNextImage?: boolean;
};

/**
 *
 * 其中 width,height 可理解为加载的图片尺寸大小，如果不指定图片样式尺寸，则会默认使用图片的加载尺寸
 *
 * 1. 支持 css 定义图片尺寸
 * 2. 支持图片 src 相对路径(主要解决 blog 文章内容中的图片)
 * 3. 支持部分图片优化: 懒加载(TODO)
 *
 * @returns
 */
function Img({
  transformImageUri,
  src,
  loading = 'lazy',
  useNextImage = true,
  ...props
}: ImgProps) {
  const [innerState, setInnerState] = useCacheState(() => {
    const loadSrc =
      transformImageUri && typeof src === 'string'
        ? transformImageUri(src, '', '')
        : src;
    return {
      src: loadSrc || '',
      loadSrc,
    };
  });

  const _src = innerState.src;

  if (useNextImage !== false) {
    return (
      <Image
        src={_src}
        loading={loading}
        title=""
        {...props}
        alt={props.alt || ''}
      />
    );
  }

  return (
    <img
      src={isString(_src) ? _src : ''}
      loading={loading}
      title=""
      {...props}
      alt={props.alt || ''}
    />
  );
}

export default Img;
