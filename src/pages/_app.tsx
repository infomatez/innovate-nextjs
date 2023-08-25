import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
// import './global.css';
import './globalnew.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
