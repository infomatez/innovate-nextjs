import Image from 'next/image';
import React, { FC } from 'react';
interface ITrendingCardProps {
  id: number;
  name: string;
  date: string;
  likes: number;
  userImg: string;
  title: string;
}
const TrendingCard: FC<ITrendingCardProps> = ({ id, title, name, userImg, date, likes }) => {
  const dateStr = date; // Your input date string
  const dates = new Date(dateStr); // Create a Date object from the string

  // Get the month name and date from the Date object
  const month = dates.toLocaleString('default', { month: 'long' });
  const day = dates.getDate();

  // Create the output string in the "Month Date" format
  const monthDateStr = `${month} ${day}`;

  return (
    <div className="sm:w-[40%] md:w-[30%] lg:w-[20%] w-[90%]">
      <div className="card relative flex justify-center items-start h-full  border-grey-200 border-[0.25px] hover:border-transparent">
        <p className="w-[10%] text-gray-400 text-lg font-bold">{id}</p>
        <div className="flex flex-col w-[80%] ml-2 pb-4">
          <span className="flex justify-start items-center">
            {userImg && <Image src={userImg} alt="" className="w-8 object-cover rounded-full" />}
            <p className="ml-2 font-semibold text-md capitalize">{name}</p>
          </span>
          <p className="w-full text-md font-normal my-2">{title}</p>
          <span className="flex justify-start items-center absolute bottom-2 right-3">
            <p className="text-gray-400 text-md  font-semibold">{monthDateStr}</p>
            <p className="text-black text-md  font-semibold mx-2">.</p>
            <p className="text-blue-400 text-md  font-semibold">
              {likes} {likes == 1 ? 'like' : 'likes'}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
