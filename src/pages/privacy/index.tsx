import IconSvgIos from '@/components/core/Icon/AssetsSvgIcon/Ios';
import Iconfont from '@/components/core/Icon/Iconfont';
import ImgIcon from '@/components/core/Icon/ImgIcon';
import { RendererComponent } from '@/container/Renderer';
import NextjsRenderer from '@/container/Renderer/NextjsRenderer';

export default RendererComponent(() => {
  return (
    <div className="text-4xl">
      <Iconfont type="icon-mac" />
      <IconSvgIos />
      <ImgIcon type="android" />
    </div>
  );
});

export const getStaticProps = NextjsRenderer.ssg();
