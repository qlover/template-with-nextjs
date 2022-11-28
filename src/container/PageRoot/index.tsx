import { default as PageRootComponent } from './Component';
import PageRootContainer from './container';

export { default as PageRootContainer } from './container';
export { default as PageRootLayout } from './PageRootLayout';

export const usePageContainer = PageRootContainer.useContainer;

export default PageRootComponent;

/**
 * 挂载以下几个页面通用方法
 *
 * 1. PageRoot Component, 包裹组件(hoc)
 *
 * 2. Renderer, next page 的 ssg/ssr 方式渲染, 挂载 `RenderDispatch`
 *
 * 3. Layout pageRoot 基础布局组件, 挂载 `laytous/BaseLayout`
 *
 */
