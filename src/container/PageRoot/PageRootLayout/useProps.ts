/* eslint-disable react-hooks/exhaustive-deps */
import { BaseLayoutProps } from '.';
import PageRootContainer from '../container';

export default function useProps(props: BaseLayoutProps) {
  const { t } = PageRootContainer.useContainer();

  const seoProps = {
    title: t('seo_title', null, { default: '' }),
    description: t('seo_desc', null, { default: '' }),
    keywords: t('seo_keywords', null, { default: '' }),
  };

  const BasicProps = {
    ...props,
    seoProps: {
      ...seoProps,
      ...props.seoProps,
    },
  };
  return BasicProps as BaseLayoutProps;
}
