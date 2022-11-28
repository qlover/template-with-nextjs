import { ConfigProvider } from 'antd';
import { NextPage } from 'next';
import PageRootContainer, {
  isPageContainerProps,
  PageContainerProps,
} from './container';

export type BaesPageRootProps = LocalApp.PageProps;

export type PageRootComponentProps<P> = P & BaesPageRootProps;

export type PageRootComponent<P = {}> = NextPage<PageRootComponentProps<P>> & {
  getPageContainerProps?: () => PageContainerProps;
};

function copyNextPageAttr<P>(
  targetCom: PageRootComponent<P>,
  sourceCom: PageRootComponent<P>
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
  props: PageContainerProps | PageRootComponent<P>,
  Component?: PageRootComponent<P>
) {
  let initContainerProps = {};
  let RenderComm: PageRootComponent<P>;

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

  const Page: PageRootComponent<P> = (props) => {
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
