import Jiantou from '@/assets/svg/jiantou.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '..';

const IconSvgJiantou = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Jiantou} />
);

IconSvgJiantou.displayName = 'IconSvgJiantou';

export default IconSvgJiantou;
