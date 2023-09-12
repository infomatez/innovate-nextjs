import UserPanelLayout from '@/src/layouts/admin/nav';
import { useEffect, useState } from 'react';
import { PATH_DASHBOARD, PATH_PROFILE } from '@/src/routes/path';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as FaIcons from 'react-icons/fa';
import { useAuth } from '@/src/context/authContext';
import { GetServerSideProps } from 'next';
import { withAuthServerSideProps } from '@/src/components/PrivateRoutes/withAuthServerSideProps';
import Cookies from 'js-cookie';
import { getUserProfile } from '@/src/services/user';
import { dislikePost, getAllPostsbyUserId, likePost, savePost, unsavePost } from "@/src/services/post"
import Modal from './model';
import PostSkeleton from '@/src/components/Skeleton/PostSkeleton';




ProfilePage.getLayout = (page: React.ReactElement) => (
  <UserPanelLayout>{page}</UserPanelLayout>
);

export default function ProfilePage() {
  const router = useRouter();
  const { removeAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const [userPosts, setUserPosts] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const initialLikedPosts = userPosts?.map((post: any, index) =>
    post?.likedBy?.includes(userProfile?._id)
  ) || [];

  const [likedPosts, setLikedPosts] = useState<boolean[]>(initialLikedPosts);

  useEffect(() => {

    const initialLikedPosts = userPosts?.map((post: any, index) =>
      post?.likedBy?.includes(userProfile?._id)
    ) || [];

    setLikedPosts(initialLikedPosts);
  }, [userPosts, userProfile]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);


  const handleLikeClick = async (index: number, postId: string) => {
    try {
      if (likedPosts[index]) {

        await dislikePost(accessTokenFromCookie, postId);


        setLikedPosts((prevLikedPosts) => {
          const updatedLikedPosts = [...prevLikedPosts];
          updatedLikedPosts[index] = false;
          return updatedLikedPosts;
        });
      } else {
        await likePost(accessTokenFromCookie, postId);

        setLikedPosts((prevLikedPosts) => {
          const updatedLikedPosts = [...prevLikedPosts];
          updatedLikedPosts[index] = true;
          return updatedLikedPosts;
        });
      }
    } catch (error) {
      console.error('Error liking/disliking post:', error);
    }
  };


  const handleSaveClick = (index: number, postId: string) => {
    try {
      if (savedPosts.includes(index)) {

        unsavePost(accessTokenFromCookie, postId)
          .then(() => {

            setSavedPosts(savedPosts.filter((item) => item !== index));
          })
          .catch((error) => {
            console.error('Error unsaving post:', error);
          });
      } else {

        savePost(accessTokenFromCookie, postId)
          .then(() => {

            setSavedPosts([...savedPosts, index]);
          })
          .catch((error) => {
            console.error('Error saving post:', error);
          });
      }
    } catch (error) {
      console.error('Error saving/unsaving post:', error);
    }
  };



  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileData = await getUserProfile(accessTokenFromCookie);
        setUserProfile(userProfileData?.message[0]);
        setIsLoading(false);

        const userId = userProfileData.message[0]._id;
        const posts = await getAllPostsbyUserId(accessTokenFromCookie, userId);
        setUserPosts(posts?.data[0]?.data);
        setIsLoading(false);
      }
      catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);


  const imageUrl = `http://localhost:9000/public/${userProfile?.profilepic}`;
  const profilePicSrc = imageUrl === "http://localhost:9000/public/undefined"
console.log(profilePicSrc,"==")

  const handleEditClick = (blogId: string) => {
    router.push(`/main/create-blog?blog_id=${blogId}`);
  };



  const handleTitleClick = (blogId: string) => {
    router.push(`/main?blog_id=${blogId}`);
  };


  const handleLogout = async () => {
    try {

      removeAccessToken();
      router.push("/");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <div className="profilewrapper pb-[50px] flex flex-col  w-full items-center ms:h-auto">
        <div className="row1 flex justify-center w-full md:justify-end ms:mb-5 md-3">
          <div className="wrapper w-fit flex gap-1 items-center p-1 rounded-b-2xl">
            <div className="img">
              {profilePicSrc ?
                <Image
                  width={25}
                  height={25}
                  alt="Profile"
                  src="/deafult-user.jpg"
                  className="xl:w-[2rem] rounded-3xl w-[25px]"
                /> :
                <Image
                  width={25}
                  height={25}
                  alt="Profile Picture"
                  src={imageUrl}
                  className="xl:w-[2rem] rounded-3xl w-[25px]"
                />
              }
            </div>
            <div className="name flex items-center">
              <h1 className="text-white font-semibold xl:text-sm text-xs">{userProfile?.name}</h1>
            </div>
            <div className="logout rounded-3xl">
              <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-1 px-2 rounded-full shadow-md text-xs cursor-pointer" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
        <div className="row2 flex justify-center ms:w-auto w-full items-center">
          <div className="wrapper w-full flex flex-col pt-5 h-[auto] rounded-t-2xl bg-opacity-20">
            <div className="profileinner flex lg:flex-row flex-col w-full justify-between">
              <div className="left bg-sidebar bg-opacity-70 lg:w-[25%] p-3 flex flex-col lg:h-[85%] h-[auto] rounded-2xl lg:gap-10 lg:sticky lg:top-6 mb-10 lg:mb-0">
                <div className="top flex flex-col justify-evenly items-center lg:gap-3 gap-2">
                  <div className="one flex flex-col w-full justify-evenly items-center">
                    <div className="imgdiv relative">
                    {profilePicSrc ?
                <Image
                  width={25}
                  height={25}
                  alt="Profile"
                  src="/deafult-user.jpg"
                  className="xl:w-[2rem] rounded-3xl w-[25px]"
                /> :
                <Image
                  width={25}
                  height={25}
                  alt="Profile Picture"
                  src={imageUrl}
                  className="xl:w-[2rem] rounded-3xl w-[25px]"
                />
              }
                      <Image width={25} height={25}
                        alt="badge"
                        src="/badge3.png"
                        className="rounded-full lg:w-[50px] md:w-[50px] w-[10vw] absolute right-[-10px] bottom-[-10px]"
                      />
                    </div>
                    <div className="onetwo flex flex-col items-center gap-2 m-4">
                      <div className="username flex gap-1 font-bold lg:text-xl lg:text-md sm:text-xs text-[10px] text-white items-center">
                        <h1>{userProfile?.username}</h1>
                      </div>
                      <div className="editprof">
                        <button
                          className="py-2 px-3 rounded-lg bg-[#393939] text-white sm:text-xs text-[10px]"
                          onClick={() => router.push(PATH_PROFILE.edit)}
                        >
                          Edit Profile
                        </button>
                        <button className="py-2 px-3 rounded-lg bg-[#393939] text-white sm:text-xs text-[10px] ml-3">
                          Share Profile
                        </button>
                      </div>
                    </div>
                    <div className="dets flex lg:justify-between justify-evenly font-md text-white sm:text-lg text-[10px] lg:w-full w-[60vw] sm:gap-0 gap-2">
                      <div className="posts  text-[12px] xl:text-[14px]">
                        <h1>{userPosts?.length} posts</h1>
                      </div>
                      <div className="followers"></div>
                      <h1 className=" text-[12px] xl:text-[14px]">
                        <button type='button' onClick={openModal}>{userProfile?.follower_details.length} Followers</button>
                      </h1>
                      <div className="following  text-[12px] xl:text-[14px]">
                        <h1>
                          <button type='button' onClick={openModal}>{userProfile?.following_details.length} Following</button>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mid text-white flex flex-col gap-2 mt-4">
                  <div className="title flex flex-col justify-between p-1">
                    <h1 className="text-xl text-white font-bold">Bio - </h1>
                    <div className="name font-bold">
                      <h1 className="capitalize text-sm mt-2 lg:text-lg">{userProfile?.bio}</h1>
                      <h1 className="capitalize text-sm mt-2 lg:text-lg">{userProfile?.name}</h1>
                    </div>
                  </div>
                  <ul className="list-disc ml-5">
                    {userProfile?.favCategories.map((category: string, index: number) => (
                      <li key={index} className="font-light text-sm lg:text-lg">
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bottom container">
                  <div className="create buttons w-full justify-center flex">
                    <Link
                      className="flex lg:p-2 sm:p-1 text-[#ff00f2]b font-bold gap-2 items-center ms:text-xl sm:text-sm text-[12px] justify-center relative mt-4"
                      href={PATH_DASHBOARD.create}
                      id="createbtn"
                    >
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        data-testid="CreateIcon"
                      >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                      </svg>
                      Create Blog
                    </Link>
                  </div>
                </div>
              </div>
              <div className="right lg:w-[75%] lg:h-[auto] sm:h-[45vh] h-[39vh] flex flex-col">
                <div className="w-full px-0 lg:px-10">
                  <div className="text-white bg-sidebar p-2 py-4 md:p-5 mx-auto  rounded-3xl items-start overflow-y-scroll scrollbar-hide w-[100%] mb-12">
                    <div className="text-xl font-['Montserrat'] font-medium leading-[1] mb-5 text-white w-full">
                      My Blogs
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                      {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => <PostSkeleton key={index} />)
                      ) : (
                        userPosts.map((post: any, index) => (
                          <div key={index} className="col-span-12 lg:col-span-6 mb-4">
                            <div className="bg-[#000] p-4 rounded-[15px]">
                              <div className="flex items-start">
                                <h3 className="flex-1 text-md md:text-lg font-['Poppins'] font-semibold leading-[1.3] text-[#ff00f2] w-full mb-2 md:mb-4 uppercase cursor-pointer"
                                  onClick={() => handleTitleClick(post?._id)}>
                                  {post.title}
                                </h3>
                                <button className="py-1 px-2 rounded-lg bg-[#393939] text-white sm:text-xs text-[10px] " onClick={() => handleEditClick(post?._id)}>
                                  Edit Blog
                                </button>
                              </div>

                              <div className="flex w-full relative mb-1">
                                <div className="w-full md:flex-1 mt-0 md:mt-0">
                                  <Image
                                    width={30}
                                    height={30}
                                    alt={post.title}
                                    src={`http://localhost:9000/public/${post?.img}`}
                                    className="w-full h-[138px] object-cover rounded-[23px]"
                                  />
                                </div>
                                <div className="w-[20%] md:w-[30%]">
                                  <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center mt-[0] h-full">
                                    <button className="min-w-0 mr-px" onClick={() => handleLikeClick(index, post?._id)}>
                                      {likedPosts[index] ? (
                                        <FaIcons.FaHeart className="min-h-0 relative w-4 shrink-0" />
                                      ) : (
                                        <FaIcons.FaRegHeart className="min-h-0 relative w-4 shrink-0" />
                                      )}
                                    </button>
                                    <button className="min-w-0 mr-px" onClick={() => handleSaveClick(index, post._id)}>
                                      {savedPosts.includes(index) ? (
                                        <FaIcons.FaBookmark className="min-h-0 relative w-4 shrink-0" />
                                      ) : (
                                        <FaIcons.FaRegBookmark className="min-h-0 relative w-4 shrink-0" />
                                      )}
                                    </button>
                                    <button className="min-w-0 mr-px">
                                      <FaIcons.FaShareSquare className="min-h-0 relative w-4 shrink-0" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end items-center mt-3">
                                <p className="flex-1 mr-2 text-[10px]">
                                  {expandedIndex === index ? post?.content : post?.content?.slice(0, 50) + '...'}
                                </p>
                                <button
                                  className="bg-white inline-flex flex-col justify-center relative text-black-100 items-stretch py-2 px-2  rounded-[19.5px]"
                                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                >
                                  <span className="whitespace-nowrap text-[10px] font-poppins leading-[1] text-black-100 relative">
                                    {expandedIndex === index ? 'Show Less' : 'Read More'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal userProfile={userProfile} onClose={closeModal} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();

