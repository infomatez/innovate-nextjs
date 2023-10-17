import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import TuneIcon from '../icons/solid/TuneIcon';
import { filters } from '@/src/utils/constant';
import Card from './Card';
import { useRouter } from 'next/router';
import { getAllCategory, getAllPosts } from '@/src/services/post';
import Cookies from 'js-cookie';
import CardSkeleton from '../Skeleton/AllbogsSkeleton';

interface Blog {
  img: string;
  title: string;
  sort_content: string;
  _id: string;
}

const Blogs = () => {
  const router = useRouter();
  const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');
  const [randomBlogs, setRandomBlogs] = useState<Blog[]>([]);
  const [selectedFilterName, setselectedFilterName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);

  const skipRef = useRef(0);

  const fetchData = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const limit = 11;
        const category = selectedFilterName;
        const response = await getAllPosts(accessTokenFromCookie, limit, null, category);
        const data = response?.data[0]?.data;
        if (page === 1) {
          setRandomBlogs(data as Blog[]);
        } else {
          setRandomBlogs((prevBlogs) => [...prevBlogs, ...(data as Blog[])]);
        }

        setLoading(false);

        const categoryData = await getAllCategory(accessTokenFromCookie);
        setCategories(categoryData?.data);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const handleRedirect = () => {
    if (accessTokenFromCookie) {
      router.push('/main/profile');
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    setPage(1);
    fetchData();
  }, [accessTokenFromCookie, selectedFilterName]);

  return (
    <section id="Blogs" className="pb-20 pt-10 h-auto bg-cover bg-star">
      <div className="text-4xl sm:text-6xl font-medium text-white flex justify-between md:justify-center items-center mb-10 h-[10vh] sm:w-screen w-[90%] mx-auto md:w-[98%]">
        <motion.h1
          style={{ textShadow: '0px 0px 4px black' }}
          whileHover={{
            scale: 1.05,
            textShadow: '0px 0px 4px white',
            cursor: 'pointer',
          }}
          className="font-bookman-old-style"
        >
          Our Blogs -
        </motion.h1>
      </div>

      <div className="flex flex-col gap-5 w-[90vw] mx-auto h-[90vh]">
        <div className="hidden md:block h-[10vh]">
          <div className="w-full">
            <div className="flex justify-center">
              {categories.map((f: any, index) => (
                <button
                  key={index}
                  className="btn whitespace-nowrap"
                  style={{
                    backgroundColor: selectedFilterName === f?.name ? 'white' : '',
                    color: selectedFilterName === f?.name ? 'black' : '',
                  }}
                  onClick={() => {
                    setselectedFilterName(selectedFilterName === f?.name ? '' : f?.name);
                  }}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full overflow-y-scroll scrollbar-hide h-[80vh] flex sm:flex-none flex-col gap-8">
          <div className="relative w-full">
            <div className="h-full ">
              {loading
                ? Array.from({ length: 8 }, (_, index) => <CardSkeleton key={index} index={index} />)
                : randomBlogs.map(({ img, title, sort_content, _id }, index) => (
                    <Card key={index} img={img} title={title} sort_content={sort_content} index={index} _id={_id} />
                  ))}
            </div>
          </div>
          <div className="flex justify-center" onClick={handleRedirect}>
            <button className="btn">Read More Blogs</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
