import { useEffect, useState } from 'react';
import Blogs from '../components/blogs/Blogs';
import Contact from '../components/contact/Contact';
import Trending from '../components/trending/Trending';
import MainLayout from '../layouts/main/nav';
import Hero from '@/src/components/hero/Hero';


HomePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default function HomePage() {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    setIsShow(true);
  }, []);

  return (
    <div className="App">
      <Hero />
      {isShow && (
        <>
          <Trending />
          <Blogs />
        </>
      )}
      <Contact />
    </div>
  );
}
