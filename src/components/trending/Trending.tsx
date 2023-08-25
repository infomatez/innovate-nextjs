import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
// import { useDispatch, useSelector } from "react-redux";
// import "react-toastify/dist/ReactToastify.css";
// import { getTrending } from "../../api";
import TrendingCard from "./TrendingCard";
import { blogsData } from "@/src/utils/constant";
import TrendingUpIcon from "../icons/border/TrendingUpIcon";

const Trending = () => {
  //   const dispatch = useDispatch();
  //   const { trending } = useSelector((state) => state.blog);
  const trending = blogsData
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

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
            {" "}
            <TrendingUpIcon height='30px' width='30px' />
            Trending
          </p>
        </motion.p>
      </div>
      <div
        className="flex hover:cursor-pointer sm:gap-[20px] gap-[20px] md:gap-[40px] justify-center flex-wrap"
        ref={ref}
      >
        {trending &&
          trending.map((b, index) => (
            <TrendingCard
              key={b._id}
              id={index + 1}
              name={b.user.name}
              title={b.title}
              userImg={b.user.img}
              date={b.createdAt}
              likes={b.likes}
            />
          ))}
      </div>
    </section>
  );
};

export default Trending;
