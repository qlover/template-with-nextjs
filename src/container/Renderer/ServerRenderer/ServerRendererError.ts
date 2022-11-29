import { Redirect } from 'next';

type ErrorConfig = {
  code: 404 | 500 | 302;
  message?: string;
};

const CodeMap: any = {
  404: { notFound: true },
  500: {
    redirect: {
      destination: '/500',
      permanent: false,
    },
  },
};

export default class ServerRendererError extends Error {
  _app_config: ErrorConfig = {
    code: 500,
  };
  constructor(config: ErrorConfig) {
    super(
      config.message
        ? 'ServerRendererError:' + config.message
        : 'ServerRendererError'
    );

    this._app_config = config;
  }

  /**
   * getServerSideProps 和 getStaticProps 都包含 redirect 或 notFound
   *
   * ServerRendererError 所以默认支持 ssr 返回结果, 后期改变可重写
   *
   * @see GetStaticPropsResult
   */
  redirect():
    | { redirect: Redirect; revalidate?: number | boolean }
    | { notFound: true; revalidate?: number | boolean } {
    return CodeMap[this._app_config.code] || CodeMap['404'];
  }
}

export class NotFoundError extends ServerRendererError {
  constructor() {
    super({ code: 404, message: 'Page Not Found' });
  }
}
export class ServerError extends ServerRendererError {
  constructor(message?: any) {
    super({ code: 500, message });
  }
}

export class RedirectError extends ServerRendererError {
  _app_redirect;
  constructor(
    redircet?:
      | { redirect: Redirect; revalidate?: number | boolean }
      | { notFound: true; revalidate?: number | boolean }
  ) {
    super({ code: 302 });

    this._app_redirect = redircet;
  }

  redirect() {
    return this._app_redirect || super.redirect();
  }
}
