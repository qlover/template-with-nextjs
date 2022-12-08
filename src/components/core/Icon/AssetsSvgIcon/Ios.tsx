import Ios from '@/assets/svgIcon/ios.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvgIos = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Ios} />
);

IconSvgIos.displayName = 'IconSvgIos';

export default IconSvgIos;
