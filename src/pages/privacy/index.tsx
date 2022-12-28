import IconSvgIos from '@/components/core/Icon/AssetsSvgIcon/Ios';
import Iconfont from '@/components/core/Icon/Iconfont';
import ImgIcon from '@/components/core/Icon/ImgIcon';
import { RendererComponent } from '@/container/Renderer/Client';
import { NextjsRenderer } from '@/container/Renderer/Server';

export default RendererComponent(() => {
  return (
    <div className="text-4xl">
      <Iconfont type="auditicon24gl-fileText" />
      <IconSvgIos />
      <ImgIcon type="android" />
    </div>
  );
});

export const getStaticProps = NextjsRenderer.ssg();
