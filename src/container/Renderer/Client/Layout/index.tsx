/* eslint-disable react-hooks/exhaustive-deps */
import Seo, { SeoProps } from '@/components/common/Seo';
import PageFooter, { PageFooterProps } from '@/components/pages/PageFooter';
import PageHeader, { PageHeaderProps } from '@/components/pages/PageHeader';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import css from './index.module.less';
import useProps from './useProps';

export type LayoutProps = {
  /**
   * seo 属性, `Seo` 组件属性
   */
  seoProps?: SeoProps;
  /**
   * 根节点 className
   */
  className?: string;

  /**
   * 主体内容 className
   */
  mainClassName?: string;

  /**
   * flase 不显示
   */
  footerProps?: false | PageFooterProps;

  /**
   * falase 不显示
   */
  headerProps?: false | PageHeaderProps;

  defaultNS?: LocalApp.Locales;
};

/**
 * 基础布局组件
 *
 * 1. 包含默认路由级别对应的 locale seo 基本信息, (前提是 i18n 文件用路由名命名),如果没有可用 `defaultNS` 指定, seo 使用 next/seo 组件
 * 2. 包含基础头部,底部组件
 *
 * @param param0
 * @returns
 */
export default function RendererLayout(props: PropsWithChildren<LayoutProps>) {
  const { footerProps, mainClassName, headerProps, seoProps, className } =
    useProps(props);

  return (
    <div className={classNames(css['BasicLayout-wrapper'], className)}>
      <Seo {...seoProps} />

      {headerProps === false ? null : <PageHeader {...headerProps} />}

      <main className={mainClassName}>{props.children}</main>

      {footerProps === false ? null : <PageFooter {...footerProps} />}
    </div>
  );
}
