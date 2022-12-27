import {
  RendererComponent,
  RendererLayout,
  usePageContainer,
} from '@/container/Renderer';
import NextjsRenderer from '@/container/Renderer/NextjsRenderer';
import { WindowIcon } from '@heroicons/react/24/outline';

const IndexPage = RendererComponent<{ ssgTitle: string }>(({ ssgTitle }) => {
  const { t, renderValue } = usePageContainer();
  const { section1, section2 } = renderValue;
  console.log(section1, section2);

  return (
    <RendererLayout>
      <section className="w-80 min-h-[40rem]">
        <div>{ssgTitle}</div>
        <h1 className="text-2xl">
          <WindowIcon />
          {t('banner_title')}
        </h1>
        <h2>{t('banner_subtitle')}</h2>
      </section>
    </RendererLayout>
  );
});

export const getStaticProps = NextjsRenderer.ssg({
  async handler() {
    return {
      ssgTitle: 'ssgTitle',
    };
  },
});

export default IndexPage;
