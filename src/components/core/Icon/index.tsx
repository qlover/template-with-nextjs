import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
export type IconSvgBaseProps = Omit<IconComponentProps, 'component' | 'ref'>;

/**
 * 该目录整理了所有使用的图标组件, 后期可扩展
 *
 * 1. 包含资产的 svg 文件组件 `AssetsSvgIcon`
 * 2. 包含 iconFont 字体图片组件 IconFont
 *
 */
