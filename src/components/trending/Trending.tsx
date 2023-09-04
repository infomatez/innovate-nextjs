import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import TrendingCard from "./TrendingCard";
import TrendingUpIcon from "../icons/border/TrendingUpIcon";
import { getTrendingPosts } from "@/src/services/post";
import Cookies from "js-cookie";
import TrendingCardSkeleton from "../Skeleton/TrendingblogSkeleton";

const Trending = () => {
  const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');
  const [trending, setTrending] = useState([]);
  const [loading,setLoading] = useState(false)
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const fetchData = async () => {
    try {
      setLoading(true)
      const limit = 10;
      const skip = 3;

      const response = await getTrendingPosts(accessTokenFromCookie, limit, skip);
      const data = response?.data[0]?.data;
      console.log(data, "--------------------------");

      setTrending(data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <section
      id="Trending"
      className="py-14 w-full h-[auto] flex flex-col justify-center bg-grey-100"
    >
      <div className="text-4xl sm:text-3xl font-bold text-black-0 flex justify-center items-start w-full mb-10">
        <motion.p
          className="font-bold text-3xl"
          style={{ textShadow: "0px 0px 4px white" }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <p className="flex items-center font-bookman-old-style md:gap-2">
            <TrendingUpIcon height='30px' width='30px' />
            Trending
          </p>
        </motion.p>
      </div>
      <div
        className="flex hover:cursor-pointer sm:gap-[20px] gap-[20px] md:gap-[40px] justify-center flex-wrap"
        ref={ref}
      >
        
        {loading ? (
          <>
            <TrendingCardSkeleton />
            <TrendingCardSkeleton />
            <TrendingCardSkeleton />
            <TrendingCardSkeleton />
            <TrendingCardSkeleton />
            <TrendingCardSkeleton />
            <TrendingCardSkeleton />
            <TrendingCardSkeleton />
            <TrendingCardSkeleton />
            <TrendingCardSkeleton />
            
          </>
        ) : (
          trending.map((b:any, index) => (
            <TrendingCard
              key={b?._id}
              id={index + 1}
              name={b?.user_details?.name}
              title={b?.title}
              userImg={b?.img}
              date={b?.createdAt}
              likes={b?.likes}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Trending;
