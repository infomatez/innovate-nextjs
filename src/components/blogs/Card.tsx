import { FC, useState } from 'react';
import parse from 'html-react-parser';
import style from './blogs.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ICardProps {
  img: string;
  title: string;
  sort_content: string;
  index: number;
  _id: string;
}

const Card: FC<ICardProps> = ({ img, title, sort_content, index, _id }) => {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleTitleClick = (blogId: string) => {
    router.push(`/main?blog_id=${blogId}`);
  };
  const synth = (typeof window !== 'undefined' && window.speechSynthesis) || undefined;

  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleConvertToSpeech = () => {
    if (isSpeaking) {
      synth?.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(sort_content);
      synth?.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div
      className={`${style['timeline-block']} ${
        index % 2 != 0 ? style['timeline-block-right'] : style['timeline-block-left']
      }`}
      key={index}
    >
      <div className={`${style['marker']} relative`}>
        <picture>
          <Image
            src="https://images.unsplash.com/photo-1682685797088-283404e24b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="New Blog"
            className="w-full h-full object-cover"
            fill={true}
          />
        </picture>
      </div>
      <div className={`${style['timeline-content']} rounded-lg`}>
        <h3 className="mb-3 cursor-pointer blog-home-timeline-title" onClick={() => handleTitleClick(_id)}>
          {title}
        </h3>
        <div className={`${style['image-box-inner']} mt-3 d-flex flex-col`}>
          <div className="w-full md:w-[40%] mt-3">
            {/* <div className="flex flex-row justify-end gap-3 relative items-center mt-[10px] md:mt-[50px] md:mb-50">
              <Image
                src="https://file.rendit.io/n/Z14BG1N5XdMogNlZjMZN.svg"
                className="min-h-0 min-w-0 mr-px relative w-4 shrink-0"
                alt="New Blog"
                fill={true}
              />
              <div className="bg-white-circle bg-cover bg-50%_50% bg-blend-normal flex flex-row justify-start relative w-4 shrink-0 h-4 items-center px-1">
                <div className="flex flex-col justify-start pt-px relative w-2 shrink-0 items-center">
                  <picture>
                    <Image
                      src="https://file.rendit.io/n/w8r4HzF1Iwrb840FSKur.svg"
                      className="min-h-0 min-w-0 relative w-1"
                      alt="test"
                      fill={true}
                    />
                  </picture>
                </div>
                <Image
                  src="https://file.rendit.io/n/7N4cWBOcUTHal1e6ncCv.svg"
                  className="min-h-0 min-w-0 relative w-0 shrink-0"
                  alt="test1"
                  fill={true}
                />
              </div>
              <Image
                src="https://file.rendit.io/n/UdoN4dOxwSywXobzfzAu.svg"
                className="min-h-0 min-w-0 relative w-3 shrink-0"
                alt="test2"
                fill={true}
              />
            </div> */}
            <div className="justify-start items-start gap-3 inline-flex mt-4 relative  bottom-0 left-0">
              <button className="button-34" onClick={handleConvertToSpeech}>
                {isSpeaking ? 'Stop Speaking' : 'Convert to Speech!'}
              </button>
              {/* <button className="min-w-0 w-8">
                <Image
                  src="https://file.rendit.io/n/cELKXuCA0nyFDKqGOTnh.svg"
                  className="min-w-0 relative w-8"
                  alt="test3"
                  fill={true}
                />
              </button> */}
            </div>
          </div>

          <div className="w-full md:flex-1 mt-2 mb-3">
            <Image
              width={600}
              height={200}
              src={`https://api.bytebloggerbase.com/public${img}`}
              className="w-full rounded-[23px] h-[280px] py-2"
              alt="test4"
            />
          </div>
        </div>
        <p className="w-[100%] h-full text-sm font-poppins tracking-[1.2151619052886964] leading-[19.6px] text-white timeline-dex-ct">
          {sort_content ? (showMore ? parse(sort_content) : parse(sort_content.split(' ').slice(0, 20).join(' '))) : ''}
        </p>

        <div className="flex justify-end">
          <button
            className="bg-white inline-flex flex-col justify-center relative h-10 text-black-100 items-stretch px-3 rounded-[19.5px]"
            onClick={toggleShowMore}
          >
            <span
              className="whitespace-nowrap text-base font-poppins leading-[7.97px] text-black-100 relative"
              onClick={() => handleTitleClick(_id)}
            >
              Read More
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
