import { has } from 'lodash';
import { GetStaticPathsContext, GetStaticPathsResult } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { BaseConfigType, ErrorHandler } from '.';
import { prepareForSerializatoin } from '../../../utils/next-utils/prepareForSerializatoin';

type HandlerType<Props extends ParsedUrlQuery = ParsedUrlQuery> = (
  context: GetStaticPathsContext
) => Promise<GetStaticPathsResult<Props> | void | Props>;

/**
 * 是否是一个 GetStaticPropsResult 返回结果
 * @param val
 * @returns
 */
function isNextResult<P extends ParsedUrlQuery = ParsedUrlQuery>(
  val: any
): val is GetStaticPathsResult<P> {
  return has(val, 'paths') && has(val, 'fallback');
}

async function wrapperHandler<P extends PlainObject>(
  context: GetStaticPathsContext,
  config: BaseConfigType<HandlerType<P>>
) {
  let result = {
    paths: [],
    fallback: false,
  } as GetStaticPathsResult<P>;
  if (config?.handler) {
    const props = await config.handler(context);
    if (props && isNextResult<P>(props)) {
      return prepareForSerializatoin(props);
    }
  }
  return result;
}

export default function getStaticPaths<
  P extends ParsedUrlQuery = ParsedUrlQuery
>(config: BaseConfigType<HandlerType<P>> = {}) {
  // const { catchError = appConfig.appEnv !== 'local' } = config;

  return async function getStaticPaths(context: GetStaticPathsContext) {
    try {
      // const { locale } = context;

      // // 更新 server state
      // RenderDispatch.state = {
      //   // @ts-expect-error
      //   query: context.params,
      //   client: {
      //     locale: (locale as LocalApp.Lang) || appConfig.lang,
      //   },
      // };

      const result = await wrapperHandler<P>(context, config);
      return result;
    } catch (e) {
      console.log('[RenderDispatch getStaticPaths error]', e);

      // if (catchError) {
      return ErrorHandler(e as Error);
      // }
    } finally {
      // RenderDispatch.clearState();
    }
  };
}
