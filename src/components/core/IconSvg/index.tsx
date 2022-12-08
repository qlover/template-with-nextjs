import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

export type IconSvgBaseProps = Omit<IconComponentProps, 'component' | 'ref'>;

// 借用 antd Icon 组件生成自定义 svg 图标
