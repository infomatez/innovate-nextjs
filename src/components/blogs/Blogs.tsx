import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import TuneIcon from "../icons/solid/TuneIcon";
import { filters } from "@/src/utils/constant";
import Card from "./Card";
import { getAllPosts } from "@/src/services/post";
import Cookies from "js-cookie";
import CardSkeleton from "../Skeleton/AllbogsSkeleton";


interface Blog {
    img: string;
    title: string;
    content: string;
}


const Blogs = () => {
    const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');
    const [randomBlogs, setRandomBlogs] = useState<Blog[]>([]);
    const [selectedFilterId, setSelectedFilterId] = useState(0);
    const [loading, setLoading] = useState(false)
    const [selectedId, setSelectedId] = useState(false);
    const skipRef = useRef(0); 

    const fetchData = async () => {
        try {
            setLoading(true)
            const limit = 10;

            const response = await getAllPosts(accessTokenFromCookie, limit, skipRef.current);
            const data = response?.data[0]?.data;
            console.log(data, "--------------------------");

            setRandomBlogs((prevBlogs) => [...prevBlogs, ...(data as Blog[])]);
              setLoading(false)
        } catch (error) {
            setLoading(true)
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, [accessTokenFromCookie]);

    useEffect(() => {
        var hashName = "";
        if (selectedFilterId > 0) {
            hashName = filters.filter((item) => item.id == selectedFilterId)[0].text;
        }
    }, [selectedFilterId]);

    const loadMore = () => {
        skipRef.current += 10;
        fetchData();
    };

    return (
        <section id="Blogs" className="pb-20 pt-10 h-auto bg-cover bg-star">
            <div className="text-4xl sm:text-6xl font-medium text-white flex justify-between md:justify-center items-center mb-10 h-[10vh] sm:w-screen w-[90%] mx-auto md:w-[98%]">
                <motion.h1
                    style={{ textShadow: "0px 0px 4px black" }}
                    whileHover={{
                        scale: 1.05,
                        textShadow: "0px 0px 4px white",
                        cursor: "pointer",
                    }}
                    className="font-bookman-old-style"
                >
                    Our Blogs -
                </motion.h1>
                <div className="md:hidden flex flex-col relative">
                    <div>
                        <TuneIcon
                            fontSize="large"
                            onClick={(e) => {
                                setSelectedId(!selectedId);
                            }}
                        />
                    </div>
                    {selectedId && (
                        <div className="w-auto bg-black-100 bg-opacity-50 p-2 rounded-2xl absolute z-10 right-0 top-12">
                            <div className=" flex justify-center flex-col">
                                {filters.slice(0, 5).map((f, index) => (
                                    <button className="btn" key={index}>{f.text}</button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-5 w-[90vw] mx-auto h-[90vh]">
                <div className="hidden md:block h-[10vh]">
                    <div className="w-full">
                        <div className="flex justify-center">
                            {filters.map((f, index) => (
                                <button key={index} className={`btn whitespace-nowrap ${selectedFilterId == f.id && 'bg-white text-black-0'}`} onClick={() => { setSelectedFilterId(selectedFilterId == f.id ? 0 : f.id); }}>{f.text}</button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full overflow-y-scroll scrollbar-hide h-[80vh] flex sm:flex-none flex-col gap-8">
                    <div className="relative w-full">
                        <div className="h-full ">
                            {loading
                                ? Array.from({ length: 8 }, (_, index) => (
                                    <CardSkeleton key={index}  index={index}/>
                                ))
                                : randomBlogs.map(({ img, title, content }, index) => (
                                    <Card key={index} img={img} title={title} content={content} index={index} />
                                ))}
                        </div>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button className="btn" onClick={loadMore}>
                            Load More
                        </button>
                    </div>
                </div>

            </div>


        </section>
    );
};

export default Blogs;
