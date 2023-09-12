import React, { useState } from "react";

import { motion } from "framer-motion";
import BookmarkSolidIcon from "@/src/components/icons/solid/BookmarkIcon";
import HomeSolidIcon from "@/src/components/icons/solid/HomeIcon";
import GroupSolidIcon from "@/src/components/icons/solid/GroupIcon";
import TrendingUpIcon from "@/src/components/icons/border/TrendingUpIcon";
import Link from "next/link";
import Image from "next/image";
import LogoIcon from '@/public/logoicon.jpeg'
import NotificationIcon from "@/src/components/icons/solid/NotificationIcon";
import { PATH_DASHBOARD } from "@/src/routes/path";
import profileImage from '@/public/alternate.png'

const Sidebar = () => {

  const [view, setView] = useState(false);
  const sideItems = [
    {
      id: 1,
      text: "Home",
      icon: <HomeSolidIcon fill="#cc00ff" />,
      to: PATH_DASHBOARD.dashboard,
    },
    {
      id: 2,
      text: "Saved",
      icon: <BookmarkSolidIcon fill="#cc00ff" />,
      to: PATH_DASHBOARD.saved,
    },
    {
      id: 3,
      text: "Create",
      icon: <TrendingUpIcon fill="#cc00ff" />,
      to: PATH_DASHBOARD.create,
    },
    {
      id: 4,
      text: "Notification",
      icon: <NotificationIcon fill="#cc00ff" />,
      to: PATH_DASHBOARD.notification,
    },
    {
      id: 5,
      text: "About Us",
      icon: <GroupSolidIcon fill="#cc00ff" />,
      to: PATH_DASHBOARD.aboutUs,
    },
    {
      id:65,
      text: "Profile",
      icon: (
        <>
          <Image
            // src={userData.img}
            src={profileImage}
            alt="UserImg"
            className="lg:w-[1.5vw] w-[3.5vw] rounded-3xl mr-1"
          />
        </>
      ),
      to: PATH_DASHBOARD.profile,
    },
  ];

  return (
    <div
      className='hidden sm:block w-[15%] xl:w-[14%]'
      id="sidebar"
    >
      <div className="w-full flex flex-col justify-between h-[100vh] sticky top-0">
        <div className="title flex">
          {/* <img src="../BLOGERBASELOGO.jpg" alt="" className="w-[13vw] hidden" /> */}
          <Image src={LogoIcon} alt="logo icon" className="w-[full]" />
        </div>
        <div className=" flex flex-col h-[50vh] gap-6">
          {sideItems.map((s) => (
            <div
              className=" flex items-center xl:px-5 px-1 py-2 gap-2 hover:bg-[#393939] rounded-3xl transition-all duration-300 ease-in-out hover:cursor-pointer w-full"
              key={s.id}
            >
              <div className="icon">{s.icon}</div>
              <Link
                href={s.to}
                className="text font-semibold text-white xl:text-lg text-xs whitespace-nowrap"
              >
                {s.text}
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center py-3 my-1 cursor-pointer justify-start text-white">
          <p className="text-center text-[8px] lg:text-[12px]">
            Copyright &copy; 2023 BlogerBase.
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Sidebar;
