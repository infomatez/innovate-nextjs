import { useEffect, useState } from 'react';
import Blogs from '../components/blogs/Blogs';
import Contact from '../components/contact/Contact';
import Trending from '../components/trending/Trending';
import MainLayout from '../layouts/main/nav';
import Hero from '@/src/components/hero/Hero';
import { useRouter } from 'next/router';
import Loader from '../components/Loader/Loader';

HomePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default function HomePage() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoading , setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    setIsShow(true);
  }, []);

  const router = useRouter();

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
    <div>
      <Hero />
      {isShow && (
        <>
          <Trending />
          <Blogs />
        </>
      )}
      <Contact />
    </div>
    </>

  );
}
