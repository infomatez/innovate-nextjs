import UserPanelLayout from '@/src/layouts/admin/nav';
import { GetServerSideProps } from 'next';
import { withAuthServerSideProps } from '@/src/components/PrivateRoutes/withAuthServerSideProps';
import { FaSearch } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Image from 'next/image';
import { useAuth } from '@/src/context/authContext';
import { followUser, getUserFollowing, getUserProfile, unfollowUser } from '@/src/services/user';
import {
  dislikePost,
  getAllPosts,
  getAllPostsbyUserId,
  getTrendingPosts,
  likePost,
  savePost,
  unsavePost,
} from '@/src/services/post';
import router, { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ShareModal from '../profile/ShareModal';
import LogoutConfirmationPopup from '@/src/components/LogoutModal/LogoutConfirmationPopup';

Dashboard.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

const ExperienceCard = ({
  title,
  img,
  content,
  createdAt,
  userName,
  id,
  accessToken,
  userProfile,
  userPosts,
  key,
  blogId,
  onDataReceived,
  index,
}: any) => {
  const router = useRouter();

  const initialFollowUser = userProfile?.followers?.includes(id);

  const [isFollowing, setIsFollowing] = useState(initialFollowUser);

  function formatDate(inputDate: any) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString();

    return `${day} ${monthNames[monthIndex]}, ${year}`;
  }

  const formattedDate = formatDate(createdAt);

  const initialsavePost = userProfile?.savedPosts.includes(blogId);
  const [saved, setSaved] = useState(initialsavePost || false);

  const handleFollowClick = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(accessToken, id);
        setIsFollowing(false);
      } else {
        await followUser(accessToken, id);
        setIsFollowing(true);
        toast.success('You are now following the user.');
      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };
  const initialLikedPosts = userPosts?.map((post: any) => post?.likedBy?.includes(userProfile?._id)) || [];


  const [likedPosts, setLikedPosts] = useState<boolean[]>(initialLikedPosts);

  useEffect(() => {
    const initialLikedPosts = userPosts?.map((post: any) => post?.likedBy?.includes(userProfile?._id)) || [];

    setLikedPosts(initialLikedPosts);

    const initialsavePost = userProfile?.savedPosts.includes(blogId);
    setSaved(initialsavePost);
    const initialFollowUser = userProfile?.followers?.includes(id);
    setIsFollowing(initialFollowUser)
  }, [userPosts, userProfile]);

  const handleSaveClick = async () => {
    try {
      if (saved) {
        await unsavePost(accessToken, blogId);
        setSaved(false);
      } else {
        await savePost(accessToken, blogId);
        setSaved(true);
      }
    } catch (error) {
      console.error('Error saving/unsaving post:', error);
      toast.error('Please Login To Save the Post');
    }
  };

  const handleLikeClick = async (index: number, postId: string) => {
    try {
      if (likedPosts[index]) {
        await dislikePost(accessToken, postId);

        setLikedPosts((prevLikedPosts) => {
          const updatedLikedPosts = [...prevLikedPosts];
          updatedLikedPosts[index] = false;
          return updatedLikedPosts;
        });
      } else {
        await likePost(accessToken, postId);

        setLikedPosts((prevLikedPosts) => {
          const updatedLikedPosts = [...prevLikedPosts];
          updatedLikedPosts[index] = true;
          return updatedLikedPosts;
        });
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  const synth = window.speechSynthesis;
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleConvertToSpeech = () => {
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(content);
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // setInterval(() => {
  //   if (synth.speaking && !isSpeaking) {
  //     setIsSpeaking(true);
  //   } else if (!synth.speaking && isSpeaking) {
  //     setIsSpeaking(false);
  //   }
  // }, 500);

  const openShareModal = (type: any) => {
    if (type === 'post') {
      const shareUrl = `${window.location.origin}/main?blog_id=${blogId}`;
      onDataReceived(type, blogId, shareUrl);
    }
  };
  const handleTitleClick = (blogId: string) => {
    router.push(`/main?blog_id=${blogId}`);
  };

  return (
    <VerticalTimelineElement
      contentStyle={{ background: '#1d1836', color: '#fff' }}
      contentArrowStyle={{ borderRight: '7px solid #232631' }}
      date={formattedDate}
      className="cursor-pointer"
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <Image
            src={`http://localhost:9000/public/${img}`}
            alt="blog_img"
            width={60}
            height={60}
            className="w-full h-full object-cover"
            style={{ borderRadius: '50%' }}
          />
        </div>
      }
    >
      <div className="relative">
        <div className="flex justify-end card-img_hover">
          <div
            className="bg-black w-10 h-10 rounded-full border border-1 border-purple-500 flex justify-center items-center cursor-pointer flex-col"
            onClick={() => handleTitleClick(blogId)}
          >
            <FaIcons.FaChevronUp />
            <FaIcons.FaChevronDown />
          </div>
        </div>
        <div className="title">
          <h3 className="text-white text-[24px] font-bold" id="aboutush2" onClick={() => handleTitleClick(blogId)}>
            {title}
          </h3>
        </div>
        <div className="flex justify-start items-center mt-2">
          <p
            className="text-secondary text-[16px] font-semibold"
            style={{
              margin: 0,
              marginRight: '10px',
            }}
          >
            {userName}
          </p>
          <div className="status">
            <button
              className="border border-[#cc00ff] rounded-2xl py-1 px-2 text-sm font-semibold"
              onClick={handleFollowClick}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      </div>
      <p>{content}</p>
      <div className="icons flex flex-col items-start md:flex-row justify-between mb-3 mt-3 md:mt-0 md:mb-0 gap-4 md:gap-2 mt-5">
        <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center mt-4  h-full">
          <button className="min-w-0 mr-px" onClick={() => handleLikeClick(index, blogId)}>
            {likedPosts[index] ? (
              <FaIcons.FaHeart className="min-h-0 relative w-4 shrink-0" />
            ) : (
              <FaIcons.FaRegHeart className="min-h-0 relative w-4 shrink-0" />
            )}
          </button>
          <button className="min-w-0 mr-px" onClick={handleSaveClick}>
            {saved ? (
              <FaIcons.FaBookmark className="min-h-0 relative w-4 shrink-0" />
            ) : (
              <FaIcons.FaRegBookmark className="min-h-0 relative w-4 shrink-0" />
            )}
          </button>
          <button className="min-w-0 mr-px" onClick={() => openShareModal('post')}>
            <FaIcons.FaShareSquare className="min-h-0 relative w-4 shrink-0" />
          </button>
        </div>
        <button className="button-34" onClick={handleConvertToSpeech}>
          {isSpeaking ? 'Stop Speaking' : 'Convert to Speech!'}
        </button>
      </div>
    </VerticalTimelineElement>
  );
};

export default function Dashboard() {
  const { accessToken, removeAccessToken } = useAuth();

  const [userProfile, setUserProfile] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any>([]);
  const [trendingpostData, setTrendingPostdata] = useState<any>(null);
  const [following, setFollowing] = useState([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareType, setShareType] = useState<any>('profile');
  const [shareurl, setShareUrl] = useState<any>('');
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSkipPage, setCurrentSkipPage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
 
  const initialLikedPosts = trendingpostData?.map((post: any) => post?.likedBy?.includes(userProfile?._id)) || [];
  const [likedPosts, setLikedPosts] = useState<boolean[]>(initialLikedPosts);

  useEffect(() => {
    const initialLikedPosts = trendingpostData?.map((post: any) => post?.likedBy?.includes(userProfile?._id)) || [];

    setLikedPosts(initialLikedPosts);

  }, [trendingpostData, userProfile]);

  const handleLogout = async () => {
    setShowPopup(true);
  };
  const handleTitleClick = (blogId: string) => {
    router.push(`/main?blog_id=${blogId}`);
  };

  const handleConfirmLogout = async () => {
    try {
      removeAccessToken();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCancelLogout = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchUserProfileAndPosts = async () => {
      try {
        const userProfileData = await getUserProfile(accessToken);
        setUserProfile(userProfileData?.message[0]);

        const userId = userProfileData?.message[0]?._id;
        const posts = await getAllPosts(accessToken, 10, 4, searchQuery);
        setUserPosts(posts?.data[0]?.data);

        const trendingpostresponse = await getTrendingPosts(accessToken, 20, 0);
        setTrendingPostdata(trendingpostresponse?.data[0]?.data);

        const followingData = await getUserFollowing(accessToken, userId);
        setFollowing(followingData?.data[0]?.following_details);
      } catch (error) {
        console.error('Error fetching user profile and posts:', error);
      }
    };

    fetchUserProfileAndPosts();
  }, [accessToken, searchQuery]);

  const [searchResults, setSearchResults] = useState([]);
  const [normalResults, setNormalResults] = useState<any>([]);
  const imageUrl = `http://localhost:9000/public/${userProfile?.profilepic}`;
  const profilePicSrc = imageUrl === 'http://localhost:9000/public/undefined';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (searchQuery) {
          const posts = await getAllPosts(accessToken, 10, 0, searchQuery);
          setSearchResults(posts?.data[0]?.data);
          setNormalResults([]);
        } else {
          const posts = await getAllPosts(accessToken, currentPage * 10, currentSkipPage * 10 + 0, '');
          setNormalResults((prevResults: any) => {
            const uniquePosts = posts?.data[0]?.data.filter((post:any) => 
              !prevResults.some((prevPost:any) => prevPost._id === post._id)
            );
            return [...prevResults, ...uniquePosts];
          });
        }
      } catch (error) {
        console.error('Error fetching user profile and posts:', error);
      }
    };
  
    fetchPosts();
  }, [searchQuery, currentPage, accessToken, currentSkipPage]);
  

  const receiveDataFromChild = (type: any, postId: string, url: string) => {
    setShareType(type);
    setIsShareModalOpen(true);
    if (postId) {
      setShareUrl(url);
    }
  };
  const closeShareModal: any = () => {
    setIsShareModalOpen(false);
  };
  const handleLoadMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setCurrentSkipPage((prevPage) => prevPage + 1);
  };
  const handleLikeClick = async (index: number, postId: string) => {
    try {
      if (likedPosts[index]) {
        await dislikePost(accessToken, postId);

        setLikedPosts((prevLikedPosts:any) => {
          const updatedLikedPosts = [...prevLikedPosts];
          updatedLikedPosts[index] = false;
          return updatedLikedPosts;
        });
      } else {
        await likePost(accessToken, postId);

        setLikedPosts((prevLikedPosts:any) => {
          const updatedLikedPosts = [...prevLikedPosts];
          updatedLikedPosts[index] = true;
          return updatedLikedPosts;
        });
      }
    } catch (error) {
      console.error('Error liking/disliking post:', error);
    }
  };
  const styles = {
    paddingX: 'sm:px-16 px-6',
    paddingY: 'sm:py-16 py-6',
    padding: 'sm:px-16 px-6 sm:py-16 py-10',

    heroHeadText:
      'font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2',
    heroSubText:
      'text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]',
    heroSubText2:
      'text-[#dfd9ff] font-medium lg:text-[20px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]',

    sectionHeadText:
      "text-white text-center  font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] font-family: 'Fjalla One' mt-5",
    sectionSubText: 'sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider',
  };

  return (
    <>
      {showPopup && <LogoutConfirmationPopup onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />}
      <section className="flex z-10 py-5 overflow-auto">
        <div className="order-1 w-full md:w-[75%] flex flex-col mx-auto ms:h-[100%] h-[95vh] md:pr-[30px]">
          <div className="text-white bg-[#393939] rounded-3xl py-1 px-3 mt-2 flex justify-between items-center mx-10 w-[85%]">
            <div className="left flex gap-3">
              <div className="search">
                <input
                  type="text"
                  placeholder="Search Blog..."
                  className="bg-[#393939] placeholder-white focus:outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="mt-10 w-full flex flex-col ">
            <VerticalTimeline>
              {searchQuery
                ? searchResults.map((post: any, index: number) => (
                    <ExperienceCard
                      index={index}
                      key={post?._id}
                      title={post?.title}
                      content={post?.content}
                      createdAt={post?.createdAt}
                      img={post?.img}
                      userName={post?.user_details?.name}
                      userProfile={userProfile}
                      id={post?.user_details?._id}
                      blogId={post?._id}
                      accessToken={accessToken}
                      userPosts={searchResults}
                      onDataReceived={receiveDataFromChild}
                    />
                  ))
                : normalResults.map((post: any, index: number) => (
                    <ExperienceCard
                      index={index}
                      key={post?._id}
                      title={post?.title}
                      content={post?.sort_content}
                      createdAt={post?.createdAt}
                      img={post?.img}
                      userName={post?.user_details?.name}
                      userProfile={userProfile}
                      id={post?.user_details?._id}
                      blogId={post?._id}
                      accessToken={accessToken}
                      userPosts={normalResults} 
                      onDataReceived={receiveDataFromChild}
                    />
                  ))}

              <div className="w-[full] text-center mt-5">
                <button onClick={handleLoadMoreClick} className="btn text-center">
                  Load More
                </button>
              </div>
            </VerticalTimeline>
          </div>
        </div>
        <div className="postright order-2 w-[22%] bg-[#101010] bg-opacity-60 md:block hidden sticky top-0">
          <div className="row1 flex justify-center w-full md:justify-end ms:mb-5 md-3">
            <div className="wrapper w-fit flex gap-3 items-center p-1 rounded-b-2xl">
              <div className="img w-[30px] h-[30px]">
                <Image
                  style={{ width: '30px', height: '30px' }}
                  width={30}
                  height={30}
                  alt="Profile Picture"
                  src={`${imageUrl}`}
                  className="xl:w-[2rem] rounded-3xl w-[25px]"
                />
              </div>

              <div className="logout rounded-3xl">
                <button
                  className="bg-gradient-to-r from-purple-500 mb-1 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-1 px-2 rounded-full shadow-md text-xs cursor-pointer"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="rightwrapper py-5 flex flex-col justify-between">
              <div className="row2 w-[100%] h-[100%] mx-auto flex flex-col gap-5 p-1 rounded-2xl h-auto">
                <div className="title flex items-center justify-center gap-1">
                  <h1 className="text-white text-2xl" id="aboutush2">
                    Trending
                  </h1>
                </div>
                <div className="trendingitems flex flex-col gap-3 h-[300px] lg:h-[400px] overflow-y-scroll scrollbar-hide">
                  {trendingpostData?.map((item: any, index: number) => (
                    <div key={index} className="eachitem flex flex-col bg-[white] p-2 rounded-2xl ">
                      <div className="title" onClick={() => handleTitleClick(item?._id)}>
                        <h1 className="font-[600] text-[#2e2e2e] text-[12px] cursor-pointer">{item.title}</h1>
                      </div>
                      <div className="details flex justify-between mt-2">
                        <div className="left flex gap-1 items-center">
                          <div className="prof rounded-3">
                            <Image
                              width={25}
                              height={25}
                              alt={`user-${index}`}
                              src={`/${item.user_details?.img}`}
                              className="w-4 rounded-lg"
                            />
                          </div>
                          <div className="writer xl:text-xs text-[10px]">
                            <h1>{item.user_details?.name}</h1>
                          </div>
                          <div className="actions flex gap-1 items-center">
                            <button className="min-w-0 mr-px" onClick={() => handleLikeClick(index,item?._id)}>
                              {likedPosts[index] ? (
                                <FaIcons.FaHeart className="min-h-0 relative w-4 shrink-0" />
                              ) : (
                                <FaIcons.FaRegHeart className="min-h-0 relative w-4 shrink-0" />
                              )}
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
                <div className="trendingitems flex flex-col gap-3 h-[300px]  lg:h-[400px] overflow-y-scroll scrollbar-hide p-3">
                  {following.map((user: any) => (
                    <a href="#" className="text-white flex" key={user?._id}>
                      <div className="img w-[30px] h-[30px]">
                        <Image
                          style={{ width: '30px', height: '30px' }}
                          width={30}
                          height={30}
                          alt="Profile Picture"
                          src={`${user?.img}`}
                          className="xl:w-[2rem] rounded-3xl w-[25px]"
                        />
                      </div>

                      <h5 className="inline-block mt-2 ms-2">{user.name}</h5>
                      {user?.verified === 'true' ? <MdIcons.MdVerified className="fill-[blue] inline-block" /> : ''}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isShareModalOpen && <ShareModal shareType={shareType} onClose={closeShareModal} shareurl={shareurl} />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
