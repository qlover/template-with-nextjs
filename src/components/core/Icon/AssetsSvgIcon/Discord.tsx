import Discord from '@/assets/svg/discord.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '..';

const IconSvgDiscord = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={Discord} />
);

IconSvgDiscord.displayName = 'IconSvgDiscord';

export default IconSvgDiscord;
