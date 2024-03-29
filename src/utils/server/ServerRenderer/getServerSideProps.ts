import { logger } from '@/utils/common'
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next/types'
import type { BaseConfigType } from '.'
import { prepareForSerializatoin } from '../prepareForSerializatoin'
import { ServerRendererError } from '../ServerRendererError'
import ServerRendererConfig from './config'

type HandlerType<Props> = (
  context: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<Props> | void | Props>

/**
 * 是否是一个 ssr 返回结果
 * @param val
 * @returns
 */
function isNextResult<P>(val: any): val is GetServerSidePropsResult<P> {
  return val.props || val.redirect || val.notFound
}

async function wrapperHandler<P extends PlainObject>(
  context: GetServerSidePropsContext,
  config: BaseConfigType<HandlerType<P>>
) {
  const { jsonTransform = true } = config

  let result = { props: { empty: true } as P | PlainObject }

  if (config?.handler) {
    const props = await config.handler(context)
    if (props && isNextResult<P>(props)) {
      return jsonTransform ? prepareForSerializatoin(props) : props
    }

    result.props = { ...result.props, ...props }
  }

  if (jsonTransform) {
    return prepareForSerializatoin(result)
  }

  return result
}

/**
 * getServerSideProps 包裹
 *
 * `handler`
 *    - 可以随意返回一个对象，会当作 props
 *    - 可以按规则返回会被 next 直接使用
 *    - 还可以什么都不返回，为了开发方便, 默认 返回 `props:{ empty:true }`
 *
 * @param config
 * @returns
 */
export default function getServerSideProps<P extends PlainObject>(
  config: BaseConfigType<HandlerType<P>> = {}
) {
  const { catchError = ServerRendererConfig.catchError } = config

  return async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
      return await wrapperHandler<P>(context, config)
    } catch (e) {
      logger.error('[getServerSideProps]', e)

      if (!catchError) {
        throw e
      }

      if (e instanceof ServerRendererError) {
        return e.redirect({ locale: context.locale as I18n.Locale })
      }

      return new ServerRendererError({
        locale: context.locale as I18n.Locale,
        pathname: '/500',
        message: String(e)
      }).redirect()
    }
  }
}
