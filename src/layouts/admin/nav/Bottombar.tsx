import React from 'react';
import { motion } from 'framer-motion';
// import { useSelector } from "react-redux";
import HomeSolidIcon from '@/src/components/icons/solid/HomeIcon';
import { PATH_DASHBOARD } from '@/src/routes/path';
import BookmarkSolidIcon from '@/src/components/icons/solid/BookmarkIcon';
import NotificationIcon from '@/src/components/icons/solid/NotificationIcon';
import GroupSolidIcon from '@/src/components/icons/solid/GroupIcon';
import TrendingUpIcon from '@/src/components/icons/border/TrendingUpIcon';
import Image from 'next/image';
import profileImage from '@/public/alternate.png';
import Link from 'next/link';

const Footerbar = () => {
  //   const { userData } = useSelector((state) => state.user);
  const sideItems = [
    {
      id: 1,
      text: 'Home',
      icon: <HomeSolidIcon fill="#cc00ff" />,
      to: PATH_DASHBOARD.dashboard,
    },
    {
      id: 2,
      text: 'Saved',
      icon: <BookmarkSolidIcon fill="#cc00ff" />,
      to: PATH_DASHBOARD.saved,
    },
    {
      id: 3,
      text: 'Create',
      icon: <TrendingUpIcon fill="#cc00ff" />,
      to: PATH_DASHBOARD.create,
    },
    {
      id: 4,
      text: 'Notification',
      icon: <NotificationIcon fill="#cc00ff" />,
      to: PATH_DASHBOARD.notification,
    },
    {
      id: 5,
      text: 'About Us',
      icon: <GroupSolidIcon fill="#cc00ff" />,
      to: PATH_DASHBOARD.aboutUs,
    },
    {
      id: 65,
      text: 'Profile',
      icon: (
        <>
          <Image
            // src={userData.img}
            src={profileImage}
            alt="UserImg"
            width={22}
            height={22}
            className=" rounded-3xl mr-1"
          />
        </>
      ),
      to: PATH_DASHBOARD.profile,
    },
  ];
  return (
    <div className="bg-[#131212] text-white w-full flex justify-center items-center h-full">
      <motion.div className="flex justify-evenly w-[80%] gap-3 items-center" whileHover={{ scale: 1.1 }}>
        {sideItems.map((s) => (
          <motion.div whileHover={{ scale: 1.4 }} key={s.id}>
            <Link href={s.to}>{s.icon}</Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Footerbar;
