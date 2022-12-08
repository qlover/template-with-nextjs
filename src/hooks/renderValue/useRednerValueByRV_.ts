/* eslint-disable react-hooks/exhaustive-deps */
import AppPropsContainer from '@/container/AppProps';
import useCacheState from '@/hooks/useCacheState';
import createRenderValue from '@/utils/createRenderValue';
import { useEffect } from 'react';

const hrefMap = {
  android: '/vpn-android',
  windows: '/vpn-windows',
  ios: '/vpn-ios',
  mac: '/vpn-windows',
  other: '/vpn-windows',
};
type RVValueType = {};

/**
 * useRenderValue 的 rv_ 开头数据的扩展
 *
 * 主要用来获取 国际化中的 rv_ 开头的数据,目前只包含 `_rvdata.json` 中的数据
 *
 * md 页面, 不会收到 pageProps,所以暂时不支持在 md 页面获取
 *
 * @returns
 *
 */
export default function useRednerValueByRV_() {
  // const { pageProps } = useContainer(AppProps);
  const { getPageProps } = AppPropsContainer.useContainer();

  const [innerState, setinnerState] = useCacheState(() => {
    const source = getPageProps().__namespaces._rvdata;
    const rvvalue = createRenderValue<RVValueType>(source);

    return rvvalue;
  });

  // 动态改变 product 链接
  useEffect(() => {
    const rvvalue = createRenderValue<RVValueType>(
      getPageProps().__namespaces._rvdata
    );

    setinnerState(rvvalue);
  }, [getPageProps().__lang]);

  return innerState;
}
