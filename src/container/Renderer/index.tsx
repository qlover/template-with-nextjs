import RendererContainer from './container';

export { default as RendererComponent } from './Component';
export { default as RendererLayout } from './Component/Layout';
export { default as RendererContainer } from './container';
// export { default as RendererServer } from './ServerRenderer';

export const usePageContainer = RendererContainer.useContainer;

/**
 * 页面渲染统一容器,用于统一处理以下几类页面:
 *
 * 1. 统一的基础布局的页面,比如统一带 pageHeader,pageFooter 页面组件
 *
 * 2. 需要使用 ssr/ssg 等服务端渲染, ServerRenderer 提供统一的 nextjs, `getServerSideProps` 和 `getStaticProps` 处理
 *
 *
 * 使用方式分两个大类
 *
 * 1. 客户端类, 就是页面组件
 * 2. 服务端类, 就是 `getServerSideProps` 和 `getStaticProps` 等
 *
 *
 * 完整的页面
 * ```
 * import {
 *   RendererComponent,
 *   RendererLayout,
 *   usePageContainer,
 * } from '@/container/Renderer';
 * import RendererServer from '@/container/Renderer/RendererServer';
 *
 * export default RendererComponent<>(() => {
 *  return (
 *    <RendererLayout>
 *      <div>111</div>
 *    </RendererLayout>
 *  )
 * })
 *
 *
 * export const getStaticProps = RenderDispatch.ssg()
 *
 * // 因为客户端和服务端是分离,导入方式也分离,避免造成混淆
 * ```
 */
