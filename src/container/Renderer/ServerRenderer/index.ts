/* eslint-disable import/no-anonymous-default-export */
import appConfig from '@/config/appConfig';
import { serverLog } from '@/utils/logger';
import { IncomingMessage } from 'http';
import getServerSideProps from './getServerSideProps';
import getStaticPaths from './getStaticPaths';
import getStaticProps from './getStaticProps';
import AppServerError, {
  RedirectError,
  ServerError,
} from './ServerRendererError';

export type BaseConfigType<H> = {
  /**
   * 是否去掉 url 中的默认语言(en)
   *
   * 重定向,比如：
   * - `/en` -> `/`
   * - `/en/support` -> `/support`
   *
   */
  removeLang?: boolean;
  routerFilter?: boolean;

  withIpInfo?: boolean;

  /**
   * 因为 接口数据可能返回 json 时, 值为 undefined, 而 next 在序列化数据时如果值为有 undefined 则会报 `SerializableError`
   *
   * 该参数用于转换 undefined 为 null
   *
   * 但是该问题目前发现 prod 环境不受影响
   *
   * @target #tag5
   */
  jsonTransform?: boolean;

  /**
   * 是否捕获错误
   */
  catchError?: boolean;

  handler?: H;
};

export function plugRemoveLang(asPath: string) {
  if (asPath.startsWith('/' + appConfig.lang)) {
    throw new RedirectError({
      redirect: { statusCode: 302, destination: '/blog' },
    });
  }
}

export function plugRouterFilter(resolvedUrl: string, locale?: string) {
  if (locale === 'zh') {
    if (resolvedUrl.startsWith('/blog')) {
      throw new RedirectError({
        redirect: { statusCode: 302, destination: '/blog' },
      });
    }
    if (resolvedUrl.startsWith('/support')) {
      throw new RedirectError({
        redirect: { statusCode: 302, destination: '/support' },
      });
    }
  }
}

/**
 * 统一的错误处理
 * @param e
 * @returns
 */
export function ErrorHandler(e: Error) {
  serverLog('[RenderDispatch ErrorHandler]', e);
  // redirect
  if (e instanceof AppServerError && e.redirect) {
    return e.redirect();
  }

  // 500
  return new ServerError(e).redirect();
}

export async function getIpaddress(req: IncomingMessage) {
  let ip;

  if (req.headers['x-forwarded-for']) {
    // @ts-expect-error
    ip = req.headers['x-forwarded-for'].split(',')[0];
  } else if (req.headers['x-real-ip']) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  return { ip };
}

export type DispatchState = {
  client: {
    locale: LocalApp.Lang;
  };
  query: NodeJS.Dict<string>;

  [key: string]: any;
};

/**
 * next page 渲染分发器，统一渲染 server 端
 *
 * - getServerSideProps
 * - getStaticPaths
 * - getStaticProps
 *
 *
 * nextjs 渲染为 server -> client
 *
 * server 渲染使用 nextjs 的 getServerSideProps,getStaticPaths,getStaticProps 这个三个方法， `RenderDisptch` 就是这个三个方法的统一分发器，方便管理维护
 *
 * server 时是不能和 client 直接通信，只能层层传递, 比如在 service 请求层，想要获取用户语言环境 client 很简单直接本地获取，但是 server端 需要从 server 的请求头中获取，这类数据可间接由 `RenderDisptch.state` 保存提供通用的客户端数据
 *
 * 最好每一次 server 渲染周期后将 `RenderDisptch.state` 销毁，防止和 client 混淆和泄露
 */
export default function RenderDispatch() {}

RenderDispatch.getServerSideProps = getServerSideProps;
RenderDispatch.ssr = getServerSideProps; // 别名

RenderDispatch.getStaticPaths = getStaticPaths;

RenderDispatch.getStaticProps = getStaticProps;
RenderDispatch.ssg = getStaticProps;

RenderDispatch.state = {} as DispatchState;
RenderDispatch.clearState = () => {
  RenderDispatch.state = {} as DispatchState;
};
