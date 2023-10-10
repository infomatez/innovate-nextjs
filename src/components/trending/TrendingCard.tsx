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
    const dateStr = date;
    const dates = new Date(dateStr);

    const month = dates.toLocaleString('default', { month: 'long' });
    const day = dates.getDate();

    const monthDateStr = `${month} ${day}`;

    return (
        <div className="sm:w-[40%] md:w-[30%] lg:w-[20%] w-[90%]">
            <div className="card relative flex justify-center items-start h-full border-grey-200 border-[0.25px] hover:border-purple hover:scale-[1.1] hover:shadow-black hover:border-[purple] rounded-[20px!important]">
                <p className="w-[10%] text-gray-400 text-lg font-bold">{id}</p>
                <div className="flex flex-col w-[80%] ml-2 pb-4">
                    <span className="flex justify-start items-center">
                        <div className="relative w-[20px] h-[20px]">
                            {userImg && <Image fill={true} src={`/http://localhost:9000/public${userImg}`} alt="" className="w-8 object-cover rounded-full" />}
                        </div>
                        <p className="ml-2 font-semibold text-md capitalize text-white">{name}</p>
                    </span>
                    <p className="w-full text-md font-normal my-2 text-white">{title}</p>
                    <span className="flex justify-start items-center absolute bottom-2 right-3">
                        <p className="text-gray-400 text-md  font-semibold text-white">{monthDateStr}</p>
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
