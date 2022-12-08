import Iconfont from '@/components/core/Iconfont';
import IconSvgAndroid from '@/components/core/IconSvg/Android';
import { RendererComponent } from '@/container/Renderer';
import RendererServer from '@/container/Renderer/RendererServer';

export default RendererComponent(() => {
  return (
    <div className="text-4xl">
      <Iconfont type="icon-mac" />
      <IconSvgAndroid />
    </div>
  );
});

export const getStaticProps = RendererServer.ssg();
