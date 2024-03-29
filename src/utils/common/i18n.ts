import i18n from 'i18n'

/**
 * 使用 pathname 获取页面对应 locale 字符串
 *
 * @param pathname
 * @returns
 */
export function getPageLocales(pathname: string) {
  const pages = i18n.pages
  // 保证不带 qs 参数的 pathname
  const path = pathname.split('?')[0]
  const i18nPages = Object.keys(pages)

  const rgxs = i18nPages.filter((p) => p.includes('rgx:'))

  // 先寻找 rgx 页面
  for (const rgx of rgxs) {
    if (new RegExp(rgx.slice(4)).test(path)) {
      return pages[rgx as I18n.Pathname]
    }
  }

  // 未找到直接利用 path 匹配
  return pages[path as I18n.Pathname]
}

/**
 * 获取 i18n 配置默认语言
 * @returns
 */
export function getDefaultLocale() {
  return i18n.defaultLocale
}

/**
 * 是否是默认国际化语言
 *
 * @param local
 * @returns
 */
export function isDefaultLocale(local: string) {
  return i18n.defaultLocale === local
}

/**
 * 去掉路径中的默认语言
 *
 * @param path
 * @returns
 */
export function dropDefaultLocale(path: string) {
  return path.replace('/' + i18n.defaultLocale, '')
}

/**
 * 是否以 locale 开头的 pathname
 * @param pathname
 */
export function isLocalStartPathname(pathname: string) {
  for (const locale of i18n.locales) {
    if (pathname.startsWith('/' + locale)) {
      return true
    }
  }
  return false
}
