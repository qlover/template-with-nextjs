import AppPropsContainer from '@/container/AppProps';
import '@/styles/css/index.css';
import '@/styles/less/index.less';
import type { AppProps } from 'next/app';

function APP(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppPropsContainer.Provider initialState={{ pageProps }}>
      <Component {...pageProps} />
    </AppPropsContainer.Provider>
  );
}

export default APP;
