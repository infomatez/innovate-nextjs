'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Footer from '../footer/Footer';
import { useRouter } from 'next/router';

const Header = dynamic(() => import('./Header'));
const Loader = dynamic(() => import('../../../components/Loader/Loader'));

type MainLayoutProps = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className={`App-list ${isLoading ? 'loading-App' : ''}`}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
