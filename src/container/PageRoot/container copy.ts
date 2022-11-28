/* eslint-disable react-hooks/exhaustive-deps */
import useRenderValue from '@/hooks/renderValue/useRenderValue';
import useTranslationRouter from '@/hooks/useTranslationRouter';

type PageContainerProps = {
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

export default function useContainer<RV>({
  i18Ns,
  rvNS,
  withRV,
}: PageContainerProps = {}) {
  const pageTrans = useTranslationRouter(i18Ns);

  const { renderValue } = useRenderValue<RV>({
    rvNS: rvNS ? rvNS : withRV ? ['_rvdata', pageTrans.i18Ns] : pageTrans.i18Ns,
  });

  return {
    ...pageTrans,
    renderValue,
  };
}
