import RenderDispatch from '@/utils/next-utils/RenderDispatch';
import Component from './Component';
import PageRootContainer from './container';
import PageRootLayout from './PageRootLayout';

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
const PageRoot = {
  /**
   * 渲染组件
   */
  Component: Component,

  /**
   * 容器
   */
  Container: PageRootContainer,

  /**
   * next page 渲染分发器，统一渲染 server 端
   */
  Renderer: RenderDispatch,

  /**
   * 渲染组件的布局组件
   */
  Layout: PageRootLayout,
};

export default PageRoot;
