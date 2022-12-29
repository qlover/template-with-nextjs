/* eslint-disable react-hooks/exhaustive-deps */
import AppPropsContainer from '@/container/AppProps';
import useCacheState from '@/hooks/common/useCacheState';
import createRenderValue from '@/utils/createRenderValue';
import { isPlainObject, isString } from 'lodash';
import { isNotEmptyArray } from 'maroonlis-utils';
import { useEffect } from 'react';

type ConfigType = {
  /**
   * i18n 空间, 可多个，默认 '_rvdata'
   */
  rvNS?: LocalApp.Locales | LocalApp.Locales[];

  dataSource?: any;
};
function getRVvalue(rvNS?: LocalApp.Locales, dataSource?: any) {
  if (rvNS && dataSource && dataSource[rvNS]) {
    return createRenderValue(dataSource[rvNS]);
  }
  return;
}
/**
 * 解析 locale 中的 rv_ 数据, 数据源从 app.pageProps.__namespace 中获取
 * @param props
 * @returns
 */
function parseRenderValue<RV>(props?: ConfigType) {
  const { rvNS, dataSource } = props || {};

  if (!isPlainObject(dataSource)) {
    return {};
  }

  if (isNotEmptyArray(rvNS)) {
    const result = {};
    rvNS.forEach((ns) => {
      Object.assign(result, getRVvalue(ns, dataSource));
    });
    return result as RV;
  }
  if (isString(rvNS)) {
    return getRVvalue(rvNS, dataSource) as RV;
  }
  return {} as RV;
}

/**
 * 获取当前页面的 renderValue
 *
 * 就是国际内的 rv_ 开头的数据
 *
 * @param dataSoure
 * @returns
 */
export default function useRenderValue<RV = any>(props?: ConfigType) {
  const { getPageProps } = AppPropsContainer.useContainer();
  const { rvNS, dataSource } = props || {};

  const [renderValue, setRenderValue] = useCacheState(() => {
    return parseRenderValue({
      rvNS: '_rvdata',
      dataSource: getPageProps().__namespaces,
      ...props,
    }) as RV & RenderValue.RvDataType;
  });

  useEffect(() => {
    setRenderValue(
      parseRenderValue({
        rvNS: '_rvdata',
        dataSource: getPageProps().__namespaces,
        ...props,
      })
    );
  }, [rvNS?.toString(), dataSource, getPageProps().__lang]);

  return { renderValue, setRenderValue };
}
