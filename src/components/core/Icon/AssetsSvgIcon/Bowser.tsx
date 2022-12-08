import Bowser from '@/assets/svgIcon/bowser.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvgBowser = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Bowser} />
);

IconSvgBowser.displayName = 'IconSvgBowser';

export default IconSvgBowser;
