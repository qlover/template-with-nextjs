import Checked from '@/assets/svg/checked.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '..';

const IconSvgChecked = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Checked} />
);

IconSvgChecked.displayName = 'IconSvgChecked';

export default IconSvgChecked;
