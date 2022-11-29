import RendererContainer from './container';

export { default as RendererComponent } from './Component';
export { default as PageRootLayout } from './Component/Layout';
export { default as RendererContainer } from './container';

export const usePageContainer = RendererContainer.useContainer;

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
