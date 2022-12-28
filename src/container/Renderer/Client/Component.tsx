import { ConfigProvider } from 'antd';
import { NextPage } from 'next';
import PageRootContainer, {
  isPageContainerProps,
  PageContainerProps,
} from './container';

export type BaesRendererProps = LocalApp.PageProps;

export type RendererComponentProps<P> = P & BaesRendererProps;

export type RendererComponentType<P = {}> = NextPage<
  RendererComponentProps<P>
> & {
  /**
   * 可用来获取 container 初始属性,也可以通过 Component 第一个参数设置
   */
  getPageContainerProps?: () => PageContainerProps;
};

function copyNextPageAttr<P>(
  targetCom: RendererComponentType<P>,
  sourceCom: RendererComponentType<P>
) {
  targetCom.propTypes = sourceCom.propTypes;
  targetCom.contextTypes = sourceCom.contextTypes;
  targetCom.defaultProps = sourceCom.defaultProps;
  targetCom.displayName = sourceCom.displayName || sourceCom.name;
  targetCom.getInitialProps = sourceCom.getInitialProps;

  return targetCom;
}

/**
 *
 * NextPage 组件容器，为了内部逻辑统一
 *
 * 被包裹 NextPage 可使用以下：
 *
 * 1. AppContainer
 * 2. AppScripts
 *
 * 如果不需要任何有关容器组件 API，可省略该组件，比如 404 目前不需要容器 API，可以直接导出组件
 *
 * @param Component
 * @returns
 */
export default function Component<P extends PlainObject>(
  props: PageContainerProps | RendererComponentType<P>,
  Component?: RendererComponentType<P>
) {
  let initContainerProps = {};
  let RenderComm: RendererComponentType<P>;

  if (isPageContainerProps(props)) {
    initContainerProps = props;

    if (!Component) {
      throw new Error('not Component');
    }

    RenderComm = Component;
  } else {
    RenderComm = props;
  }

  if (RenderComm.getPageContainerProps) {
    initContainerProps = RenderComm.getPageContainerProps();
  }

  const Page: RendererComponentType<P> = (props) => {
    return (
      <PageRootContainer.Provider initialState={initContainerProps}>
        <ConfigProvider>
          <RenderComm {...props} />
        </ConfigProvider>
      </PageRootContainer.Provider>
    );
  };

  // 复制 attr
  copyNextPageAttr<P>(Page, RenderComm);

  return Page;
}
