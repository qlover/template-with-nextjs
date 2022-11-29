import useRenderValue from '@/hooks/renderValue/useRenderValue';
import useTranslationRouter from '@/hooks/useTranslationRouter';
import { isPlainObject } from 'lodash';
import { createContainer } from 'unstated-next';
export type PageContainerProps = {
  /**
   * translate ns 国际化命名空间，默认当前页面路由转换的空间
   */
  i18Ns?: LocalApp.Locales;

  /**
   * rv 数据空间，默认 i18Ns
   */
  rvNS?: LocalApp.Locales | LocalApp.Locales[];

  /**
   * 是否包含 `_rvdata` 数据, 默认为 false, 如果显示指定了 rvNS, 则该属性无效
   */
  withRV?: boolean;
};

export function isPageContainerProps(val: any): val is PageContainerProps {
  return isPlainObject(val);
}

function useContainer(initProps?: PageContainerProps) {
  const { i18Ns, rvNS, withRV } = initProps || {};

  const pageTrans = useTranslationRouter(i18Ns);

  const { renderValue } = useRenderValue({
    rvNS: rvNS ? rvNS : withRV ? ['_rvdata', pageTrans.i18Ns] : pageTrans.i18Ns,
  });

  return {
    ...pageTrans,
    renderValue,
  };
}

/**
 *
 * pageRoot 容器
 *
 */
const RendererContainer = createContainer(useContainer);

export default RendererContainer;
