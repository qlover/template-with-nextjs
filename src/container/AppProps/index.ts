import { useCallback } from 'react';
import { createContainer } from 'unstated-next';

type ContainerType = {
  pageProps: any;
};

function usePropsContainer(initstate: ContainerType = { pageProps: {} }) {
  const getPageProps = useCallback(() => {
    return initstate.pageProps as LocalApp.PageProps;
  }, [initstate.pageProps]);

  return {
    getPageProps,
  };
}

/**
 * appProps 容器，专门用来获取 _app.tsx props
 *
 *
 * #tag3:
 * FIXE: !!! md 页面, 不会收到 pageProps
 * 并且改属性只会传递一次,第二次不会传递，
 * 比如: 第一次访问 md 页面没有 pageProps, 第二次返回另一个页面，就会为空 pageProps, 如果此时对 pageProps 有依赖就会出错
 * 暂时解决方案: app 提供一个 getPageProps 方法随时获取最新 pageProps
 *
 * @target #tag3
 */
const AppPropsContainer = createContainer(usePropsContainer);

export default AppPropsContainer;
