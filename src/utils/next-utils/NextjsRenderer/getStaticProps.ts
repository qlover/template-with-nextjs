import appConfig from '@/config/appConfig';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult
} from 'next/types';
import RenderDispatch, { BaseConfigType } from '.';
import { prepareForSerializatoin } from '../prepareForSerializatoin';
import { RedirectError, ServerError } from './ServerRendererError';

type StaticConfigType<P> = BaseConfigType<HandlerType<P>> & {
  /**
   * 预渲染后超时时间，
   *
   * 重新渲染时间，单位秒
   *
   * 可以被 handler 返回的 `revalidate` 覆盖
   *
   * 默认 10 分钟， 10*60
   */
  revalidate?: number | boolean;
};

/**
 * 10 分钟
 */
const DEFAULT_REVALIDATE = 600;

type HandlerType<Props> = (
  context: GetStaticPropsContext
) => Promise<GetStaticPropsResult<Props> | void | Props>;

/**
 * 是否是一个 ssr 返回结果
 * @param val
 * @returns
 */
function isNextResult<P>(val: any): val is GetStaticPropsResult<P> {
  return val.props || val.redirect || val.notFound !== void 0;
}

async function wrapperHandler<
  P extends { [key: string]: any } = { [key: string]: any }
>(context: GetStaticPropsContext, config: StaticConfigType<P>) {
  const { jsonTransform = appConfig.appEnv !== 'master' } = config;

  let result = {
    props: { empty: '1' } as unknown as P,
  } as GetStaticPropsResult<P>;

  if (config.revalidate) {
    result.revalidate = config.revalidate;
  } else if (config.revalidate !== false) {
    result.revalidate = DEFAULT_REVALIDATE;
  }

  if (config?.handler) {
    const props = await config.handler(context);
    if (props && isNextResult<P>(props)) {
      result = { ...result, ...props };
    }

    // @ts-expect-error
    result.props = { ...result.props, ...props };
  }

  if (jsonTransform) {
    return prepareForSerializatoin(result);
  }

  return result;
}

/**
 * GetStaticProps 包裹
 *
 * `handler`
 *    - 可以随意返回一个对象，会当作 props
 *    - 可以按规则返回会被 next 直接使用
 *    - 还可以什么都不返回，为了开发方便, 默认 返回 `props:{ empty:'1' }`
 *    - 可手动抛出 `ServerRendererError` 由 `ErrorHandler` 处理
 *
 * @param config
 * @returns
 */
export default function getStaticProps<
  P extends { [key: string]: any } = { [key: string]: any }
>(config: StaticConfigType<P> = {}) {
  const getStaticProps: GetStaticProps<P> = async (context) => {
    try {
      const { locale } = context;

      // 更新 server state
      RenderDispatch.state = {
        // @ts-expect-error
        query: context.params,
        client: {
          locale: (locale as LocalApp.Lang) || appConfig.lang,
        },
      };

      const result = await wrapperHandler<P>(context, config);

      return result;
    } catch (e) {
      console.log('[RenderDispatch getStaticProps error]', e);
      // if (config.catchError || appConfig.appEnv !== 'local') {
      //   // return ErrorHandler(e as Error);
      //   // return new NotFoundError();
      // }

      if (e instanceof ServerError) {
        return e.redirect();
      }

      if (e instanceof RedirectError) {
        return e.redirect();
      }

      return {
        props: {} as P,
        revalidate: config.revalidate,
      };
    } finally {
      RenderDispatch.clearState();
    }
  };

  return getStaticProps;
}
