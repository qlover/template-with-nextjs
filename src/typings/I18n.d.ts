// 对应 i18n.js 配置类型
declare namespace I18n {
  type Locale = 'en' | 'zh';

  type LocalesType = Array<Locale>;

  type Pathname = '/';

  type I18nNS = 'common' | 'index'

  type PagesType = Record<Pathname, Array<I18nNS>>;
}