import appConfig from '@/config/appConfig';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next/types';
import RenderDispatch, {
  BaseConfigType,
  ErrorHandler,
  plugRouterFilter,
} from '.';
import { prepareForSerializatoin } from '../../../utils/next-utils/prepareForSerializatoin';
import { parseQSForString } from '../../../utils/next-utils/wrapperContext';

type HandlerType<Props> = (
  context: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<Props> | void | Props>;

/**
 * 是否是一个 ssr 返回结果
 * @param val
 * @returns
 */
function isNextResult<P>(val: any): val is GetServerSidePropsResult<P> {
  return val.props || val.redirect || val.notFound;
}

async function wrapperHandler<P extends PlainObject>(
  context: GetServerSidePropsContext,
  config: BaseConfigType<HandlerType<P>>
) {
  const { resolvedUrl, locale } = context;

  const {
    jsonTransform = appConfig.appEnv !== 'master',
    routerFilter = appConfig.appEnv !== 'local',
  } = config;

  let result = { props: { empty: true } as P | PlainObject };

  routerFilter && plugRouterFilter(resolvedUrl, locale);

  if (config?.handler) {
    const props = await config.handler(context);
    if (props && isNextResult<P>(props)) {
      return jsonTransform ? prepareForSerializatoin(props) : props;
    }

    result.props = { ...result.props, ...props };
  }

  if (jsonTransform) {
    return prepareForSerializatoin(result);
  }

  return result;
}

/**
 * getServerSideProps 包裹
 *
 * `handler`
 *    - 可以随意返回一个对象，会当作 props
 *    - 可以按规则返回会被 next 直接使用
 *    - 还可以什么都不返回，为了开发方便, 默认 返回 `props:{ empty:true }`
 *    - 可手动抛出 `AppServerError` 由 `ErrorHandler` 处理
 *
 * @param config
 * @returns
 */
export default function getServerSideProps<P extends PlainObject>(
  config: BaseConfigType<HandlerType<P>> = {}
) {
  const { catchError = appConfig.appEnv !== 'fork:test' } = config;

  return async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
      const { locale } = context;

      // 更新 server state
      RenderDispatch.state = {
        query: parseQSForString(context.query),
        client: {
          locale: (locale as LocalApp.Lang) || appConfig.lang,
        },
      };

      return await wrapperHandler<P>(context, config);
    } catch (e) {
      console.log('[DispatechRender Error]', e);

      if (catchError) {
        return ErrorHandler(e as Error);
      }
    } finally {
      RenderDispatch.clearState();
    }
  };
}
