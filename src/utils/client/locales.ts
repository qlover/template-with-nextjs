import appConfig from '@/config/appConfig';
import { isServer } from '@/config/nextEnv';
import RenderDispatch from '../next-utils/NextjsRenderer';

/**
 * 将本地语言转换成 cms 请求头识别语言
 *
 * @param local
 */
export function toLocale(local: LocalApp.Lang) {
  return local;
}

/**
 * 自动根据当前渲染环境注入获取 `Accept-Language` 字段值
 *
 * - server 环境当前语言从 `RenderDispatch.state` 获取
 * - client 环境当前语言从客户端本地存储获取
 *
 * @param local
 * @returns
 */
export function injectAcceptLanguage(local?: LocalApp.Lang) {
  const lang =
    local || isServer() ? RenderDispatch.state.client?.locale : appConfig.lang;

  return { 'Accept-Language': toLocale(lang) };
}
