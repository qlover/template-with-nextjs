import appConfig from '@/config/appConfig';
import { createFromIconfontCN } from '@ant-design/icons';

export type IconFontType = 'icon-mac';

/**
 * 借用 antd createFromIconfontCN 创建的 iconfont.cn 上的字体图标
 */
const Iconfont = createFromIconfontCN<IconFontType>({
  scriptUrl: appConfig.iconFont,
});

export default Iconfont;
