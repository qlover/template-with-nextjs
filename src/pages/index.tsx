import PageRoot from '@/container/PageRoot';
import { WindowIcon } from '@heroicons/react/24/outline';

const IndexPage = PageRoot.Component<{ ssgTitle: string }>(({ ssgTitle }) => {
  const { t, renderValue } = PageRoot.Container.useContainer();
  const { section1, section2 } = renderValue;
  console.log(section1, section2);

  return (
    <PageRoot.Layout>
      <section className="w-80 min-h-[40rem]">
        <div>{ssgTitle}</div>
        <h1 className="text-2xl">
          <WindowIcon />
          {t('banner_title')}
        </h1>
        <h2>{t('banner_subtitle')}</h2>
      </section>
    </PageRoot.Layout>
  );
});

export const getStaticProps = PageRoot.Renderer.ssg({
  async handler() {
    return {
      ssgTitle: 'ssgTitle',
    };
  },
});

export default IndexPage;
