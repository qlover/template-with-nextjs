function genSvgIconTpl(fileName, comName) {
  return `import ${comName} from '@/assets/svg/${fileName}.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '..';

const IconSvg${comName} = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={${comName}} />
);

IconSvg${comName}.displayName = 'IconSvg${comName}';

export default IconSvg${comName};
`;
}

module.exports = genSvgIconTpl;
