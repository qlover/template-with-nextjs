import Head from 'next/head';
import { FC } from 'react';

type AppHeadsProps = {};
const AppHeads: FC<AppHeadsProps> = () => {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </Head>
  );
};

export default AppHeads;
