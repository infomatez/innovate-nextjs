import UserPanelLayout from '@/src/layouts/admin/nav';
import * as FaIcons from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useAuth } from '@/src/context/authContext';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { getPostsByBlogId, getTrendingPosts } from '@/src/services/post';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { likePost, savePost, dislikePost, unsavePost, commentOnPost } from '@/src/services/post';
import { getUserProfile } from '@/src/services/user';
import { toast } from 'react-hot-toast';


MainPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function MainPage() {
  const router = useRouter();
  const { blog_id } = router.query;
  const {accessToken} = useAuth();
  const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');
  const [isCommentBoxOpen, setCommentBoxOpen] = useState(true);
  const [content, setContent] = useState('');
  const [blogData, setBlogData] = useState<any>(null);
  const userId = blogData?.user_details?._id
  const [userProfileData, setUserProfileData] = useState<any>(null);
  const [trendingpostData, setTrendingPostdata] = useState<any>(null)

  const initialLiked = blogData?.likedBy?.includes(userId);
  const [liked, setLiked] = useState(initialLiked || false);
  const initialsavePost = userProfileData?.savedPosts?.includes(blog_id)

  const [saved, setSaved] = useState(initialsavePost || false);

  const toggleCommentBox = () => {
    setCommentBoxOpen((prevState) => !prevState);
  };
  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log('Comment submitted:', content);
      await commentOnPost(accessTokenFromCookie, content, blog_id);
      toast.success("Comment Added Sucessfully")

      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const swiperRef = useRef<any>();

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        if (!blog_id) {
          return;
        }
        const response = await getPostsByBlogId(accessTokenFromCookie, blog_id);
        console.log('Blog Data:', response?.data[0]?.data[0]);
        setBlogData(response?.data[0]?.data[0]);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, [blog_id]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserProfile(accessTokenFromCookie);
        console.log('User Profile Data:', response?.message[0]);
        setUserProfileData(response?.message[0]);


        const trendingpostresponse = await getTrendingPosts(accessTokenFromCookie, 10, 0)
        console.log("trending response", trendingpostresponse?.data[0]?.data)

        setTrendingPostdata(trendingpostresponse?.data[0]?.data)
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, [accessTokenFromCookie]);


  useEffect(() => {

    const initialLikedPosts = blogData?.likedBy?.includes(userId)

    setLiked(initialLikedPosts);


    const initialsavePost = userProfileData?.savedPosts?.includes(blog_id)
    setSaved(initialsavePost)
  }, [blog_id, blogData]);

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await dislikePost(accessTokenFromCookie, blog_id)
        setLiked(false);
      } else {
        await likePost(accessTokenFromCookie, blog_id);
        setLiked(true);
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      toast.error("Please Login To Like the Post")
    }
  };

  const handleSaveClick = async () => {
    try {
      if (saved) {
        await unsavePost(accessTokenFromCookie, blog_id);
        setSaved(false);
      } else {
        await savePost(accessTokenFromCookie, blog_id);
        setSaved(true);
      }
    } catch (error) {
      console.error('Error saving/unsaving post:', error);
      toast.error("Please Login To Save the Post")

    }
  };


  const dateStr = blogData?.createdAt;
  const date = new Date(dateStr);

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  console.log(formattedDate);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section className="flex  z-10 py-5 overflow-auto">
      <div className="order-1 w-full md:w-[75%] flex flex-col mx-auto ms:h-[100%] h-[95vh] pr-[30px]">
        <h1
          id="pageDiv"
          className="text-md lg:text-4xl font-['Poppins'] font-semibold leading-[1.3] text-white relative w-full mb-10 mt-10"
        >
          {blogData?.title}
        </h1>
        <div className="flex flex-row gap-3 w-full items-center mb-3">
          <Image width={25} height={25}
            alt="test"
            src={`http://localhost:9000/public/${blogData?.user_details?.profilepic}`}
            className="w-[30px] h-[30px] shrink-0 rounded-[50%]"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-row ml-0 gap-3 items-center">
              <div className="flex flex-row items-center">
                <div className="text-sm font-['Poppins'] font-medium leading-[7.75px] text-[#d2d2d2] w-24">
                  {blogData?.user_details?.username}
                </div>
                {/* <Image width={25} height={25} alt="test2" src="https://file.rendit.io/n/k5mrVfCDc9tO8JNiDnLR.png" className="ml-2" /> */}
              </div>
              {/* <div className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded">
                <div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">
                  Follow
                </div>
              </div> */}
            </div>
            <div className="flex flex-row justify-between mr-12 items-center mt-1">
              <div className="text-xs font-['Inter'] font-light text-[#b7b7b7] ">2 min read</div>
              <div className="text-xs font-['Inter'] font-light text-[#b7b7b7]">.</div>
              <div className="text-xs font-['Inter'] font-light  text-[#b7b7b7] ms-1">{formattedDate}</div>
            </div>
          </div>
        </div>

        <Image width={25} height={25}
          className="w-full h-[70%] rounded-[43px] object-cover"
          src="https://img.blogerbase.com/api/upload/KlBLAzhWLU"
          alt="test3"
        />

        <div className="relative flex gap-4 flex-row justify-start flex-wrap mt-4 mb-5">
          {userProfileData?.favCategories?.map((category, index) => (
            <span
              key={index}
              className="text-sm font-['Montserrat'] inline font-medium leading-[6.9px] bg-[rgba(130,_130,_130,_0.49)] text-white rounded-lg relative py-3 px-4"
            >
              <button>{category}</button>
            </span>
          ))}
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <div className="justify-start items-center gap-3 inline-flex mt-4">
            <button className="btn">Convert to speech!</button>
            <button className="min-w-0 w-8">
              <Image width={25} height={25}
                alt="test4"
                src="https://file.rendit.io/n/cELKXuCA0nyFDKqGOTnh.svg"
                className="min-w-0 relative w-8"
              />
            </button>
          </div>
         
          <div className="flex flex-row justify-start gap-5 relative items-center">
          <button onClick={handleLikeClick}>
            {liked && accessToken ? (
              <FaIcons.FaThumbsUp className="w-10 fill-[#f00] w-[32px] h-[32px]" />
            ) : (
              <FaIcons.FaRegThumbsUp className="w-10 fill-white w-[32px] h-[32px]" />
            )}
          </button>
          <button onClick={handleSaveClick}>
            {saved && accessToken ? (
              <FaIcons.FaBookmark className="w-10 fill-[#bf02b5] w-[32px] h-[32px]" />
            ) : (
              <FaIcons.FaRegBookmark className="w-10 fill-white w-[32px] h-[32px]" />
            )}
          </button>
          <button>
            <FaIcons.FaShareSquare className="w-10 fill-white w-[32px] h-[32px]" />
          </button>
        </div>
      

        </div>
        <hr className="opacity-25 bg-light relative bg-white w-full h-[2px]  block mt-5" />
        <div className="flex flex-col flex-wrap gap-20 relative w-full     mt-5">
          <p className="text-lg font-['Poppins'] tracking-[1.6783638191223145] leading-[37.4px] text-white relative">
            {blogData?.content}
          </p>
          <Image width={100} height={100} alt="test5" src={`http://localhost:9000/public/${blogData?.img}`} />
          <p className="text-lg font-['Poppins'] tracking-[1.6783638191223145] leading-[37.4px] text-white relative">
            Rest of blog Data.{' '}
          </p>
          <div>
            <div className="flex flex-row gap-3 w-full items-center cursor-pointer mb-4" onClick={toggleCommentBox}>
              <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="31" height="31" fill="#3B3B3B" />
                <g id="view blog &#62;desktop" clipPath="url(#clip0_0_1)">
                  <rect width="1280" height="2601" transform="translate(-247 -2256)" fill="#100F0F" />
                  <g id="Group 9742">
                    <g id="Group 9741">
                      <path
                        id="Vector"
                        d="M25.4592 0.387695H5.09185C3.7414 0.387695 2.44627 0.921792 1.49137 1.87249C0.536461 2.82319 0 4.11261 0 5.4571L0 20.6653C0 22.0098 0.536461 23.2992 1.49137 24.2499C2.44627 25.2006 3.7414 25.7347 5.09185 25.7347H8.78344L14.4494 30.5038C14.6792 30.6974 14.9706 30.8037 15.2717 30.8037C15.5728 30.8037 15.8642 30.6974 16.0941 30.5038L21.7676 25.7347H25.4592C26.8097 25.7347 28.1048 25.2006 29.0597 24.2499C30.0146 23.2992 30.5511 22.0098 30.5511 20.6653V5.4571C30.5511 4.11261 30.0146 2.82319 29.0597 1.87249C28.1048 0.921792 26.8097 0.387695 25.4592 0.387695ZM28.0052 20.6653C28.0052 21.3376 27.7369 21.9823 27.2595 22.4576C26.782 22.933 26.1345 23.2 25.4592 23.2H21.7676C21.1659 23.2002 20.5837 23.4126 20.1243 23.7995L15.2755 27.8766L10.4294 23.7995C9.96928 23.412 9.38605 23.1996 8.78344 23.2H5.09185C4.41663 23.2 3.76906 22.933 3.29161 22.4576C2.81415 21.9823 2.54592 21.3376 2.54592 20.6653V5.4571C2.54592 4.78486 2.81415 4.14015 3.29161 3.6648C3.76906 3.18945 4.41663 2.9224 5.09185 2.9224H25.4592C26.1345 2.9224 26.782 3.18945 27.2595 3.6648C27.7369 4.14015 28.0052 4.78486 28.0052 5.4571V20.6653Z"
                        fill="white"
                      />
                      <path
                        id="Vector_2"
                        d="M8.91127 9.25931H15.2761C15.6137 9.25931 15.9375 9.12579 16.1762 8.88811C16.4149 8.65044 16.549 8.32808 16.549 7.99196C16.549 7.65584 16.4149 7.33348 16.1762 7.09581C15.9375 6.85813 15.6137 6.72461 15.2761 6.72461H8.91127C8.57366 6.72461 8.24987 6.85813 8.01115 7.09581C7.77242 7.33348 7.63831 7.65584 7.63831 7.99196C7.63831 8.32808 7.77242 8.65044 8.01115 8.88811C8.24987 9.12579 8.57366 9.25931 8.91127 9.25931Z"
                        fill="white"
                      />
                      <path
                        id="Vector_3"
                        d="M21.6409 11.793H8.91127C8.57366 11.793 8.24987 11.9265 8.01115 12.1642C7.77242 12.4018 7.63831 12.7242 7.63831 13.0603C7.63831 13.3964 7.77242 13.7188 8.01115 13.9565C8.24987 14.1941 8.57366 14.3277 8.91127 14.3277H21.6409C21.9785 14.3277 22.3023 14.1941 22.541 13.9565C22.7797 13.7188 22.9138 13.3964 22.9138 13.0603C22.9138 12.7242 22.7797 12.4018 22.541 12.1642C22.3023 11.9265 21.9785 11.793 21.6409 11.793Z"
                        fill="white"
                      />
                      <path
                        id="Vector_4"
                        d="M21.6409 16.8643H8.91127C8.57366 16.8643 8.24987 16.9978 8.01115 17.2355C7.77242 17.4731 7.63831 17.7955 7.63831 18.1316C7.63831 18.4677 7.77242 18.7901 8.01115 19.0278C8.24987 19.2654 8.57366 19.399 8.91127 19.399H21.6409C21.9785 19.399 22.3023 19.2654 22.541 19.0278C22.7797 18.7901 22.9138 18.4677 22.9138 18.1316C22.9138 17.7955 22.7797 17.4731 22.541 17.2355C22.3023 16.9978 21.9785 16.8643 21.6409 16.8643Z"
                        fill="white"
                      />
                    </g>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_0_1">
                    <rect width="1280" height="2601" fill="white" transform="translate(-247 -2256)" />
                  </clipPath>
                </defs>
              </svg>
              <div className="flex flex-col gap-2 w-[285px] h-5">
                <div className="text-xl font-['Poppins'] font-medium leading-[11px] text-white">
                  Comment Your Thoughts....
                </div>
                <div className="border-solid border-[#8d8d8d] mr-1 h-px shrink-0 border-t border-b-0 border-x-0" />
              </div>
            </div>

            <div
              className={`bg-[#212121] flex-row justify-start gap-5 relative w-full h-64 items-end pb-2 px-2 rounded-[19.296960830688477px] ${isCommentBoxOpen ? 'hidden' : 'flex'
                }`}
            >
              <div className="flex w-full  bottom-5">
                <form
                  className="h-[50px] w-full flex rounded-lg justify-between px-2 items-center"
                  onSubmit={handleCommentSubmit}
                >
                  <textarea
                    className="resize-none bg-[rgba(130,_130,_130,_0.49)] text-sm font-['Poppins'] flex-1 font-medium leading-[10px] text-white relative rounded-[20px] p-3"
                    placeholder="Add Comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <button className="min-h-0 min-w-0">
                    <Image width={25} height={25}
                      alt="test5"
                      src="https://file.rendit.io/n/pXhcAcr2az9Z3CozUPlQ.svg"
                      className="min-h-0 min-w-0 mb-1 relative w-6 shrink-0 ml-3"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="bg-[rgba(36,_35,_35,_0.35)] p-4">
            <div className="flex flex-col justify-start gap-3 relative w-full items-stretch">
              <div className="flex flex-row justify-start gap-px relative items-center mb-px mr-12">
                <Image width={25} height={25}
                  alt="test5"
                  className="min-h-0 min-w-0 mr-1 relative w-6 shrink-0 rounded-[50%]"
                  src={blogData?.user_details?.img}
                />
                <p className="text-sm font-['Poppins'] font-medium leading-[7.56px] text-white relative inline-block">
                {blogData?.user_details?.username}
                </p>
                <Image width={25} height={25} alt="test5" src="https://file.rendit.io/n/k5mrVfCDc9tO8JNiDnLR.png" className="ml-2 w-5" />
              </div>
              <div className="text-xs font-['Poppins'] leading-[11.6px] text-white relative"> 2.5K followers</div>
              <div className="text-xs font-['Poppins'] font-light leading-[18.6px] text-white relative"></div>
            </div>
            <h3 className="text-xl font-['Poppins'] leading-[1.25] text-white relative w-full text-center mt-5 mb-5">
              More From {blogData?.user_details?.username}
            </h3>
            <div className="flex items-center flex-wrap mt-5 w-full">
              <button onClick={goPrev} className="custom-prev-button mr-5">
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="17.3582" cy="17.3582" r="16.9869" stroke="white" strokeWidth="0.742595" />
                  <path
                    d="M18.7773 12.4404L13.5792 17.6386"
                    stroke="white"
                    strokeWidth="1.11389"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18.3848 22.4863L13.5579 17.6595"
                    stroke="white"
                    strokeWidth="1.11389"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <Swiper
                ref={swiperRef}
                navigation={{
                  prevEl: '.custom-prev-button',
                  nextEl: '.custom-next-button',
                }}
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={3}
                loop={true}
                autoplay={{ delay: 1000 }}
              >
                <SwiperSlide>
                  <div className="blog-card">
                    <Image width={25} height={25}
                      alt="test5"
                      src={'https://img.blogerbase.com/api/upload/KlBLAzhWLU'}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-sm font-['Poppins'] font-light leading-[18px]  text-white relative w-full">
                        akshd ah dash dakhs akh dakh d
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="blog-card">
                    <Image width={25} height={25}
                      alt="test6"
                      src={'https://img.blogerbase.com/api/upload/KlBLAzhWLU'}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-sm font-['Poppins'] font-light leading-[18px]  text-white relative w-full">
                        akshd ah dash dakhs akh dakh d
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="blog-card">
                    <Image width={25} height={25}
                      alt="test7"
                      src={'https://img.blogerbase.com/api/upload/KlBLAzhWLU'}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-sm font-['Poppins'] font-light leading-[18px]  text-white relative w-full">
                        akshd ah dash dakhs akh dakh d
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
                
              </Swiper>

              <button onClick={goNext} className="custom-next-button ml-5">
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="17.3586"
                    cy="17.3586"
                    r="16.9869"
                    transform="rotate(-180 17.3586 17.3586)"
                    stroke="white"
                    strokeWidth="0.742595"
                  />
                  <path
                    d="M15.9395 22.2764L21.1376 17.0782"
                    stroke="white"
                    strokeWidth="1.11389"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.332 12.2314L21.1589 17.0583"
                    stroke="white"
                    strokeWidth="1.11389"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {accessToken &&
      <div className="postright order-2 w-[30%] bg-[#101010] bg-opacity-60 md:block hidden sticky top-0">
      <div className="rightwrapper py-5 flex flex-col justify-between">
        <div className="row2 w-[100%] h-[100%] mx-auto flex flex-col gap-5 p-1 rounded-2xl h-auto">
          <div className="title flex items-center justify-center gap-1">
            <h1 className="text-white text-2xl" id="aboutush2">
              Related Blog
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
              Trending
            </h1>
          </div>
          <div className="trendingitems flex flex-col gap-3 h-[300px]  lg:h-[400px] overflow-y-scroll scrollbar-hide">
            {trendingpostData?.map((item, index) => (
              <div key={index} className="eachitem flex flex-col bg-[white] p-2 rounded-2xl">
                <div className="title">
                  <h1 className="font-[600] text-[#2e2e2e] text-[12px]">
                    {item.title}
                  </h1>
                </div>
                <div className="details flex justify-between mt-2">
                  <div className="left flex gap-1 items-center">
                    <div className="prof rounded-3">
                      <Image width={25} height={25} alt={`user-${index}`} src={item.user_details?.img} className="w-4 rounded-lg" />
                    </div>
                    <div className="writer xl:text-xs text-[10px]">
                      <h1>{item.user_details?.name}</h1>
                    </div>
                    <div className="actions flex gap-1 items-center">
                      <button className="min-w-0 mr-px">
                        <FaIcons.FaPlusCircle className="min-h-0 text-[#0D7C83] relative w-4 shrink-0" />
                      </button>
                    </div>
                  </div>
                  <div className="right flex items-center">
                    <div className="views bg-[#6dc993] font-bold rounded-2xl px-1 xl:text-xs text-[10px]">
                      {item.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
    </div>
     }
    </section>
  );
}
