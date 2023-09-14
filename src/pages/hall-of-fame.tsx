import { useRouter } from 'next/router';
import CanvasLayout from '../layouts/canvas';
import { hofitems } from '../utils/constant';
import { PATH_AUTH } from '../routes/path';

HOF.getLayout = (page: React.ReactElement) => <CanvasLayout>{page}</CanvasLayout>;

export default function HOF() {
  const router = useRouter()

  return (
    <div className="w-full h-[100vh] overflow-y-scroll scrollbar-hide flex flex-col pt-10 p-5 text-slate-300 gap-20">
      <div className="titleofhof md:w-[80%] w-[90%] mx-auto flex items-center justify-between">
        <h1 className="md:text-5xl text-2xl flex-1 font-poppins font-medium leading-[24.6px] text-white w-full">
        HALL OF FAME
        </h1>
        <button className="button-34" onClick={() => router.push(PATH_AUTH.root)}>
          Home
        </button>
      </div>
      {hofitems.map((h, index) => (
        <div className="item flex flex-col gap-2 md:gap-10 mb-10 md:mb-20" key={h.id + index}>
          <div className="title font-bold text-[24px] md:text-4xl mx-auto text-center">{h.title}</div>
          <div className="content hover:text-[#7063f2] md:w-[80%] w-[100%]  mx-auto py-3 px-4 rounded-lg border  md:text-lg border-slate-500 flex flex-col mt-5">
            <span className="flex justify-center">
              {h.id == 9 && h.url && (
                <a href="mailto:support@blogerbase.com" className="text-blue-400">
                  {h.url}
                </a>
              )}
            </span>
            {h.content.split(/● /g).map((item, index) => (
              <div key={index} className="flex gap-3 text-[14px] tracking-[2.85px]">
                {index > 0 && <hr />}
                {index > 0 && <div className="bullet">&#9679;</div>}
                {item}
              </div>
            ))}
            <span className="flex justify-center">
              {h.id != 9 && h.url && (
                <a href="mailto:support@blogerbase.com" className="text-blue-400">
                  {h.url}
                </a>
              )}
            </span>
          </div>
        </div>
      ))}
      <div className="rewards w-[80%] mx-auto flex flex-col gap-10 mb-[100px]">
        {/* <div className="title font-bold text-4xl mx-auto" id="aboutush2">
          <h1>Rewards</h1>
        </div> */}
        <div className="reward flex md:flex-row cursor-pointer mb-5 py-5"  onClick={() => router.push(PATH_AUTH.hallofFameReward)}>
          <div className='font-bold text-[24px] md:text-4xl text-white flex items-center'>Go to The Hall Of Fame <img src='arrow-right-6-circle.svg' className='w-[60px] h-[60px] ms-1' alt='Next image'/></div>
        </div>
      </div>
    </div>
  );
}
