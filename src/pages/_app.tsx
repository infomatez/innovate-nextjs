import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../context/authContext'; // Update the path to your auth context
import './globalnew.css';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';
type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}


export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  const [isLoading , setIsLoading] = useState<boolean>(false);
  const router = useRouter();


  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true); // Show the loader when route changes start
    };
  
    const handleRouteChangeComplete = () => {
      setIsLoading(false); // Hide the loader when route changes complete
    };
  
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
  
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);
  

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
     {isLoading && <Loader />}
    <Toaster />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </>
  );
}
