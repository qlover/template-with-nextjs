import Jiantou from '@/assets/svgIcon/jiantou.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvgJiantou = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Jiantou} />
);

IconSvgJiantou.displayName = 'IconSvgJiantou';

export default IconSvgJiantou;
