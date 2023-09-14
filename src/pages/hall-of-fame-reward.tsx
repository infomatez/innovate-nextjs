import { useRouter } from 'next/router';
import CanvasLayout from '../layouts/canvas';
import {  newhofitems } from '../utils/constant';
import { PATH_AUTH } from '../routes/path';
import { useAuth } from '../context/authContext';
import { useEffect, useState } from 'react';
import { getAllHofData } from '../services/hall-of-fame';

HOF.getLayout = (page: React.ReactElement) => <CanvasLayout>{page}</CanvasLayout>;

export default function HOF() {
  const { accessToken } = useAuth();
  const router = useRouter()
  const [userhalloffameData, setUserHallofFameData] = useState<any>(null);



  useEffect(() => {
    const fetchUserHofData = async () => {
      try {
        const userHallofFameData = await getAllHofData(accessToken);
        setUserHallofFameData(userHallofFameData?.data[0]?.data);

      }
      catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserHofData();
  }, []);


  console.log(userhalloffameData,"jjjjjjjjjjjjjjj")

  return (
    <div className="w-full h-[100vh] overflow-y-scroll scrollbar-hide flex flex-col pt-10 p-5 text-slate-300 gap-20 ">
      <div className="titleofhof md:w-[80%] w-[90%] mx-auto flex items-center justify-between">
      
      </div>
      {newhofitems.map((h, index) => (
        <div className="item flex flex-col gap-2 md:gap-10 mb-10 md:mb-10" key={h.id + index}>
          <div className='w-[86.5%] mx-auto flex justify-between' >
          <div className="title font-bold  text-[18px] tracking-[2.85px] text-white">{h.title}</div>
          <button className="button-34" onClick={() => router.push(PATH_AUTH.root)}>
          Home
        </button>
          </div>
          <div className="content hover:text-[#7063f2] md:w-[88%] w-[100%]  mx-auto py-3 px-4 rounded-lg   md:text-lg border-slate-500 flex flex-col">
            <span className="flex justify-center">
            
            </span>
            {h.content.split(/● /g).map((item, index) => (
              <div key={index} className="flex gap-3 text-[14px] tracking-[2.85px]">
                {index > 0 && <hr />}
                {index > 0 && <div className="bullet">&#9679;</div>}
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
<div className='w-[88%] mx-auto mb-36'>
<table className="w-full table-fixed border">
    <thead  className='h-[101px]'>
      <tr>
        <th className="w-1/3 border  p-2 text-[#BC2FFF] text-xl">Researcher</th>
        <th className="w-1/3 border  p-2 text-[#BC2FFF] text-xl">Vulnerability</th>
        <th className="w-1/3 border border-red p-2 text-[#BC2FFF] text-xl">Date</th>
      </tr>
    </thead>
    <tbody>
   {userhalloffameData?.map((user:any)=>(
     <tr className='py-2'>
     <td className="border-r animate-border p-2 text-[#BC2FFF] text-center p-[30px] text-lg">{user?.name}</td>
     <td className="border-r border-white p-2 text-[#BC2FFF] text-center p-[30px] text-lg">{user?.description}</td>
     <td className="border-r border-white p-2 text-[#BC2FFF] text-center p-[30px] text-lg">
  {new Date(user?.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</td>
   </tr>

   ))}
    </tbody>
  </table>
</div>

    </div>

  );
}
