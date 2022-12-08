function genSvgIconTpl(fileName, comName) {
  return `import ${comName} from '@/assets/svgIcon/${fileName}.svg';
import Icon from '@ant-design/icons';
import React from 'react';
import { IconSvgBaseProps } from '.';

const IconSvg${comName} = React.forwardRef<HTMLSpanElement, IconSvgBaseProps>(
  (props, ref) => <Icon {...props} ref={ref} component={${comName}} />
);

IconSvg${comName}.displayName = 'IconSvg${comName}';

export default IconSvg${comName};
`;
}

function genSvgIconIndexTpl() {
  return `import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

export type IconSvgBaseProps = Omit<IconComponentProps, 'component' | 'ref'>;
`;
}

module.exports = { genSvgIconTpl, genSvgIconIndexTpl };
