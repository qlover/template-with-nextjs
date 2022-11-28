import PageRootComponent, {
  PageRootLayout,
  usePageContainer,
} from '@/container/PageRoot';
import RenderDispatch from '@/container/PageRoot/RenderDispatch';
import { WindowIcon } from '@heroicons/react/24/outline';

const IndexPage = PageRootComponent<{ ssgTitle: string }>(({ ssgTitle }) => {
  const { t, renderValue } = usePageContainer();
  const { section1, section2 } = renderValue;
  console.log(section1, section2);

  return (
    <PageRootLayout>
      <section className="w-80 min-h-[40rem]">
        <div>{ssgTitle}</div>
        <h1 className="text-2xl">
          <WindowIcon />
          {t('banner_title')}
        </h1>
        <h2>{t('banner_subtitle')}</h2>
      </section>
    </PageRootLayout>
  );
});

export const getStaticProps = RenderDispatch.ssg({
  async handler() {
    return {
      ssgTitle: 'ssgTitle',
    };
  },
});

export default IndexPage;
