import { PageProgressBar } from '@/components/common/PageProgressBar';
import AppPropsContainer from '@/container/AppProps';
import '@/styles/css/index.css';
import '@/styles/less/index.less';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function APP(props: AppProps) {
  const { Component, pageProps } = props;

  // 开启页面加载进度条
  useEffect(() => {
    PageProgressBar();
  }, []);

  return (
    <AppPropsContainer.Provider initialState={{ pageProps }}>
      <Component {...pageProps} />
    </AppPropsContainer.Provider>
  );
}

export default APP;
