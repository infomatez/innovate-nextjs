import UserPanelLayout from "@/src/layouts/admin/nav";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/src/components/PrivateRoutes/withAuthServerSideProps";
import { FaSearch } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";
dashboard.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

const ExperienceCard = () => {

    return (
        <VerticalTimelineElement
            contentStyle={{ background: "#1d1836", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #232631" }}
            date={'10-01-1999'}
            className="cursor-pointer"
            icon={
                <div className="flex justify-center items-center w-full h-full">
                    <Image
                        src={'https://images.theconversation.com/files/479421/original/file-20220816-10908-uvh62x.jpg?ixlib=rb-1.1.0&rect=4%2C5%2C994%2C497&q=45&auto=format&w=668&h=324&fit=crop'}
                        alt="blog_img"
                        width={200}
                        height={200}
                        style={{ borderRadius: '50%' }}
                    />
                    {/* <Image
                        src="https://images.theconversation.com/files/479421/original/file-20220816-10908-uvh62x.jpg?ixlib=rb-1.1.0&rect=4%2C5%2C994%2C497&q=45&auto=format&w=668&h=324&fit=crop" 
                        width={200}
                        height={200}
                    /> */}
                </div>
            }
        >
            <div className="relative">
                <div className="flex justify-end card-img_hover">
                    <div className="bg-black w-10 h-10 rounded-full border border-1 border-purple-500 flex justify-center items-center cursor-pointer"></div>
                </div>
                <div className="title">
                    <h3 className="text-white text-[24px] font-bold" id="aboutush2">
                        Title Area
                    </h3>
                </div>
                <div className="flex justify-start items-center mt-2">
                    <p
                        className="text-secondary text-[16px] font-semibold"
                        style={{
                            margin: 0,
                            marginRight: "10px",
                        }}
                    >
                        name
                    </p>
                    <div className="status">
                        <button className="border border-[#cc00ff] rounded-2xl py-1 px-2 text-sm font-semibold">
                            Follow
                        </button>
                    </div>
                </div>
            </div>
            <p>
                This is the content part
            </p>
            <div className="icons flex justify-between items-center gap-2 mt-5">
                Icons part
                <button className="button-34">
                    Convert to speech!
                </button>
            </div>
        </VerticalTimelineElement>
    );
};

export default function dashboard() {
    const styles = {
        paddingX: "sm:px-16 px-6",
        paddingY: "sm:py-16 py-6",
        padding: "sm:px-16 px-6 sm:py-16 py-10",

        heroHeadText:
            "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
        heroSubText:
            "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",
        heroSubText2:
            "text-[#dfd9ff] font-medium lg:text-[20px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",

        sectionHeadText:
            "text-white text-center  font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] font-family: 'Fjalla One'",
        sectionSubText:
            "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
    };

    return (
        <section className="flex z-10 py-5 overflow-auto">
            <div className="order-1 w-full md:w-[75%] flex flex-col mx-auto ms:h-[100%] h-[95vh] pr-[30px]">
                <div className="text-white bg-[#393939] rounded-3xl py-1 px-3 mt-2 flex justify-between items-center mx-10 w-[85%]">
                    <div className="left flex gap-3">
                        <div className="search">
                            <input
                                type="text"
                                placeholder="Search Blog..."
                                className="bg-[#393939] placeholder-white focus:outline-none text-sm"
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div className="icon">
                            <FaSearch className="cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className={styles.sectionHeadText} id="aboutush2">
                        Our Blogs
                    </h2>
                </div>
                <div className="mt-10 w-full flex flex-col overflow-y-scroll scrollbar-hide">
                    <VerticalTimeline>
                        <ExperienceCard />
                        <ExperienceCard />
                        <ExperienceCard />
                        <ExperienceCard />
                    </VerticalTimeline>
                </div>
            </div>
            <div className="postright order-2 w-[22%] bg-[#101010] bg-opacity-60 md:block hidden sticky top-0">
                <div className="">
                    <div className="rightwrapper py-5 flex flex-col justify-between">
                        <div className="row2 w-[100%] h-[100%] mx-auto flex flex-col gap-5 p-1 rounded-2xl h-auto">
                            <div className="title flex items-center justify-center gap-1">
                                <h1 className="text-white text-2xl" id="aboutush2">
                                    Trending
                                </h1>
                            </div>
                            <div className="trendingitems flex flex-col gap-3 h-[300px] lg:h-[400px] overflow-y-scroll scrollbar-hide">
                                <div className="eachitem flex flex-col bg-[white] p-2 rounded-2xl">
                                    <div className="title">
                                        <h1 className="font-[600] text-[#2e2e2e] text-[12px]">
                                            The Importance of End-Point Security in Today&apos; Cutting-Edge Tech World
                                        </h1>
                                    </div>
                                    <div className="details flex justify-between mt-2">
                                        <div className="left flex gap-1 items-center">
                                            <div className="prof">
                                                <Image width={25} height={25} alt="test8" src="https://file.rendit.io/n/DHgSaM3f3YuNXwHCzdKQ.png" className="w-4" />
                                            </div>
                                            <div className="writer xl:text-xs text-[10px]">
                                                <h1>Amartya Raj</h1>
                                            </div>
                                            <div className="actions flex gap-1 items-center">
                                                <button>
                                                    <FaIcons.FaHeart className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaPlusCircle className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaCommentAlt className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="right flex items-center">
                                            <div className="views bg-[#6dc993] font-bold rounded-2xl px-1 xl:text-xs text-[10px]"> 100K </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="eachitem flex flex-col bg-[white] p-2 rounded-2xl">
                                    <div className="title">
                                        <h1 className="font-[600] text-[#2e2e2e] text-[12px]">
                                            The Importance of End-Point Security in Today &apos; Cutting-Edge Tech World
                                        </h1>
                                    </div>
                                    <div className="details flex justify-between mt-2">
                                        <div className="left flex gap-1 items-center">
                                            <div className="prof">
                                                <Image width={25} height={25} alt="test9" src="https://file.rendit.io/n/DHgSaM3f3YuNXwHCzdKQ.png" className="w-4" />
                                            </div>
                                            <div className="writer xl:text-xs text-[10px]">
                                                <h1>Amartya Raj</h1>
                                            </div>
                                            <div className="actions flex gap-1 items-center">
                                                <button>
                                                    <FaIcons.FaHeart className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaPlusCircle className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaCommentAlt className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="right flex items-center">
                                            <div className="views bg-[#6dc993] font-bold rounded-2xl px-1 xl:text-xs text-[10px]"> 100K </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="eachitem flex flex-col bg-[white] p-2 rounded-2xl">
                                    <div className="title">
                                        <h1 className="font-[600] text-[#2e2e2e] text-[12px]">
                                            The Importance of End-Point Security in Today &apos; Cutting-Edge Tech World
                                        </h1>
                                    </div>
                                    <div className="details flex justify-between mt-2">
                                        <div className="left flex gap-1 items-center">
                                            <div className="prof">
                                                <Image width={25} height={25} alt="test9" src="https://file.rendit.io/n/DHgSaM3f3YuNXwHCzdKQ.png" className="w-4" />
                                            </div>
                                            <div className="writer xl:text-xs text-[10px]">
                                                <h1>Amartya Raj</h1>
                                            </div>
                                            <div className="actions flex gap-1 items-center">
                                                <button>
                                                    <FaIcons.FaHeart className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaPlusCircle className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaCommentAlt className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="right flex items-center">
                                            <div className="views bg-[#6dc993] font-bold rounded-2xl px-1 xl:text-xs text-[10px]"> 100K </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="eachitem flex flex-col bg-[white] p-2 rounded-2xl">
                                    <div className="title">
                                        <h1 className="font-[600] text-[#2e2e2e] text-[12px]">
                                            The Importance of End-Point Security in Today &apos; Cutting-Edge Tech World
                                        </h1>
                                    </div>
                                    <div className="details flex justify-between mt-2">
                                        <div className="left flex gap-1 items-center">
                                            <div className="prof">
                                                <Image width={25} height={25} alt="test9" src="https://file.rendit.io/n/DHgSaM3f3YuNXwHCzdKQ.png" className="w-4" />
                                            </div>
                                            <div className="writer xl:text-xs text-[10px]">
                                                <h1>Amartya Raj</h1>
                                            </div>
                                            <div className="actions flex gap-1 items-center">
                                                <button>
                                                    <FaIcons.FaHeart className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaPlusCircle className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaCommentAlt className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="right flex items-center">
                                            <div className="views bg-[#6dc993] font-bold rounded-2xl px-1 xl:text-xs text-[10px]"> 100K </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="eachitem flex flex-col bg-[white] p-2 rounded-2xl">
                                    <div className="title">
                                        <h1 className="font-[600] text-[#2e2e2e] text-[12px]">
                                            The Importance of End-Point Security in Today &apos; Cutting-Edge Tech World
                                        </h1>
                                    </div>
                                    <div className="details flex justify-between mt-2">
                                        <div className="left flex gap-1 items-center">
                                            <div className="prof">
                                                <Image width={25} height={25} alt="test9" src="https://file.rendit.io/n/DHgSaM3f3YuNXwHCzdKQ.png" className="w-4" />
                                            </div>
                                            <div className="writer xl:text-xs text-[10px]">
                                                <h1>Amartya Raj</h1>
                                            </div>
                                            <div className="actions flex gap-1 items-center">
                                                <button>
                                                    <FaIcons.FaHeart className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaPlusCircle className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaCommentAlt className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="right flex items-center">
                                            <div className="views bg-[#6dc993] font-bold rounded-2xl px-1 xl:text-xs text-[10px]"> 100K </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="eachitem flex flex-col bg-[white] p-2 rounded-2xl">
                                    <div className="title">
                                        <h1 className="font-[600] text-[#2e2e2e] text-[12px]">
                                            The Importance of End-Point Security in Today &apos; Cutting-Edge Tech World
                                        </h1>
                                    </div>
                                    <div className="details flex justify-between mt-2">
                                        <div className="left flex gap-1 items-center">
                                            <div className="prof">
                                                <Image width={25} height={25} alt="test9" src="https://file.rendit.io/n/DHgSaM3f3YuNXwHCzdKQ.png" className="w-4" />
                                            </div>
                                            <div className="writer xl:text-xs text-[10px]">
                                                <h1>Amartya Raj</h1>
                                            </div>
                                            <div className="actions flex gap-1 items-center">
                                                <button>
                                                    <FaIcons.FaHeart className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaPlusCircle className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaCommentAlt className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="right flex items-center">
                                            <div className="views bg-[#6dc993] font-bold rounded-2xl px-1 xl:text-xs text-[10px]"> 100K </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="eachitem flex flex-col bg-[white] p-2 rounded-2xl">
                                    <div className="title">
                                        <h1 className="font-[600] text-[#2e2e2e] text-[12px]">
                                            The Importance of End-Point Security in Today &apos; Cutting-Edge Tech World
                                        </h1>
                                    </div>
                                    <div className="details flex justify-between mt-2">
                                        <div className="left flex gap-1 items-center">
                                            <div className="prof">
                                                <Image width={25} height={25} alt="test9" src="https://file.rendit.io/n/DHgSaM3f3YuNXwHCzdKQ.png" className="w-4" />
                                            </div>
                                            <div className="writer xl:text-xs text-[10px]">
                                                <h1>Amartya Raj</h1>
                                            </div>
                                            <div className="actions flex gap-1 items-center">
                                                <button>
                                                    <FaIcons.FaHeart className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaPlusCircle className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaCommentAlt className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="right flex items-center">
                                            <div className="views bg-[#6dc993] font-bold rounded-2xl px-1 xl:text-xs text-[10px]"> 100K </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="eachitem flex flex-col bg-[white] p-2 rounded-2xl">
                                    <div className="title">
                                        <h1 className="font-[600] text-[#2e2e2e] text-[12px]">
                                            The Importance of End-Point Security in Today &apos; Cutting-Edge Tech World
                                        </h1>
                                    </div>
                                    <div className="details flex justify-between mt-2">
                                        <div className="left flex gap-1 items-center">
                                            <div className="prof">
                                                <Image width={25} height={25} alt="test9" src="https://file.rendit.io/n/DHgSaM3f3YuNXwHCzdKQ.png" className="w-4" />
                                            </div>
                                            <div className="writer xl:text-xs text-[10px]">
                                                <h1>Amartya Raj</h1>
                                            </div>
                                            <div className="actions flex gap-1 items-center">
                                                <button>
                                                    <FaIcons.FaHeart className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaPlusCircle className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                                <button className="min-w-0 mr-px">
                                                    <FaIcons.FaCommentAlt className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="right flex items-center">
                                            <div className="views bg-[#6dc993] font-bold rounded-2xl px-1 xl:text-xs text-[10px]"> 100K </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <a
                                href="#"
                                className="text-base font-['Poppins'] tracking-[0.9100434494018554] leading-[9.55px] text-white mt-3 relative inline-block"
                            >
                                See All
                            </a>
                        </div>
                        <div className="row2 w-[100%] mx-auto flex flex-col gap-5 p-1 rounded-2xl h-auto mt-8">
                            <div className="title flex items-center justify-center gap-1">
                                <h1 className="text-white text-2xl" id="aboutush2">
                                    People You Follow 
                                </h1>
                            </div>
                            <div className="trendingitems flex flex-col gap-3 h-[300px]  lg:h-[400px] overflow-y-scroll scrollbar-hide p-6">
                                <a href="#" className="text-white   "><h5 className="inline-block">Abir Banerjee</h5> <MdIcons.MdVerified className="fill-[blue] inline-block" /> </a>
                                <a href="#" className="text-white   "><h5 className="inline-block">Abir Banerjee</h5> <MdIcons.MdVerified className="fill-[blue] inline-block" /> </a>
                                <a href="#" className="text-white   "><h5 className="inline-block">Abir Banerjee</h5> <MdIcons.MdVerified className="fill-[blue] inline-block" /> </a>
                                <a href="#" className="text-white   "><h5 className="inline-block">Abir Banerjee</h5> <MdIcons.MdVerified className="fill-[blue] inline-block" /> </a>
                                <a href="#" className="text-white   "><h5 className="inline-block">Abir Banerjee</h5> <MdIcons.MdVerified className="fill-[blue] inline-block" /> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


// export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
