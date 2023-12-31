/* eslint-disable react-hooks/exhaustive-deps */
import UserPanelLayout from '@/src/layouts/admin/nav';
import * as FaIcons from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useAuth } from '@/src/context/authContext';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getPostsByBlogId, getPostsByCategory, getTrendingPosts } from '@/src/services/post';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Cookies from 'js-cookie';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/router';
import { likePost, savePost, dislikePost, unsavePost, getAllPostsbyUserId } from '@/src/services/post';
import { followUser, getUserProfile, unfollowUser } from '@/src/services/user';
import { toast } from 'react-hot-toast';
import ShareModal from './profile/ShareModal';
import {
  commentOnPost,
  deleteComment,
  dislikePostComment,
  fetchAllCommentsForPost,
  likePostComment,
} from '@/src/services/comment';
import LogoutConfirmationPopup from '@/src/components/LogoutModal/LogoutConfirmationPopup';
import BlogPostSkeleton from '@/src/components/Skeleton/BlogPostSkeleton';
import React from 'react';
import dynamic from 'next/dynamic';
import { PATH_AUTH } from '@/src/routes/path';
import SideTrendingpostSKeleton from '@/src/components/Skeleton/SideTrendingpostSKeleton';

MainPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

const DynamicEditor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }, // Use the ssr: false option to prevent server-side rendering
);

function MainPage() {
  const router = useRouter();
  const { blog_id } = router.query;
  const { accessToken, removeAccessToken } = useAuth();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');
  const [isCommentBoxOpen, setCommentBoxOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');
  const [userpost, setUserPosts] = useState([]);
  const [blogData, setBlogData] = useState<any>(null);
  const [relatedBlogData, setRelatedBlogData] = useState<any>(null);
  const [isCooldown, setIsCooldown] = useState(false);
  const [isCooldown2, setIsCooldown2] = useState(false);
  const userId = blogData?.user_details?._id;
  const [userProfileData, setUserProfileData] = useState<any>(null);
  const [trendingpostData, setTrendingPostdata] = useState<any>(null);
  const initialFollowUser = userProfileData?.followers?.includes(userId);
  const [isFollowing, setIsFollowing] = useState(initialFollowUser || false);
  const initialLiked = blogData?.likedBy?.includes(userId);
  const [liked, setLiked] = useState(initialLiked || false);
  const initialsavePost = userProfileData?.savedPosts?.includes(blog_id);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareType, setShareType] = useState<'profile' | 'post'>('profile');
  const commentsContainerRef = useRef<HTMLDivElement | null>(null);
  const initialrealtedLikedPosts = relatedBlogData?.map((post: any) => post?.likedBy?.includes(userId)) || [];
  const initialtrendingLikedPosts = trendingpostData?.map((post: any) => post?.likedBy?.includes(userId)) || [];
  const [likedPosts, setLikedPosts] = useState<boolean[]>(initialrealtedLikedPosts);
  const [saved, setSaved] = useState(initialsavePost || false);
  const [savedrealtedblog, setSavedrealtedBlog] = useState<any[]>(initialrealtedLikedPosts);
  const [savedtrendingblog, setSavedTrendingBlog] = useState<any[]>(initialtrendingLikedPosts);
  const [showPopup, setShowPopup] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/main?blog_id=${blog_id}` : '';

  const [isSpeaking, setIsSpeaking] = useState(false);

  const synth = (typeof window !== 'undefined' && window.speechSynthesis) || undefined;

  const handleConvertToSpeech = () => {
    if (!synth) return;
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(blogData?.content);
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const toggleCommentBox = () => {
    setCommentBoxOpen((prevState) => !prevState);
  };

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const newCommentResponse = await commentOnPost(accessTokenFromCookie, content, blog_id);
      toast.success('Comment Added Successfully');

      const newComment = newCommentResponse.data;
      setComments((prevComments): any => [newComment, ...prevComments]);

      setContent('');
      if (commentsContainerRef.current) {
        commentsContainerRef.current.scrollTop = 0;
      }
    } catch (error) {
      toast.error('Please Login To add comment');
      console.error('Error submitting comment:', error);
    }
  };

  const formatDateToRelative = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  const openShareModal = (type: 'profile' | 'post') => {
    setShareType(type);
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };
  const swiperRef = useRef<any>();

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await fetchAllCommentsForPost(accessTokenFromCookie, blog_id);
        setComments(fetchedComments?.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [accessTokenFromCookie, blog_id]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        if (!blog_id) {
          return;
        }

        const response = await getPostsByBlogId(accessTokenFromCookie, blog_id);
        setBlogData(response?.data[0]?.data[0]);

        const category = response?.data[0]?.data[0]?.category;

        const relatedBlogResponse = await getPostsByCategory(accessTokenFromCookie, category);
        setRelatedBlogData(relatedBlogResponse?.data[0]?.data);
        setIsLoading(false);
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
        setUserProfileData(response?.message[0]);

        const trendingpostresponse = await getTrendingPosts(accessTokenFromCookie, 10, 0);
        setTrendingPostdata(trendingpostresponse?.data[0]?.data);

        const MainUserPost = await getAllPostsbyUserId(accessTokenFromCookie, response?.message[0]?._id, '');
        setUserPosts(MainUserPost?.data[0]?.data);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, [accessTokenFromCookie]);

  useEffect(() => {
    const initialLikedPosts = blogData?.likedBy?.includes(userId);

    setLiked(initialLikedPosts);
    const initialFollowUser = userProfileData?.followers?.includes(userId);
    setIsFollowing(initialFollowUser);

    const initialsavePost = userProfileData?.savedPosts?.includes(blog_id);
    setSaved(initialsavePost);

    const initialrealtedLikedPosts = relatedBlogData?.map((post: any) => post?.likedBy?.includes(userId)) || [];

    setLikedPosts(initialrealtedLikedPosts);
  }, [blog_id, blogData, relatedBlogData]);

  const handleLikeClick = async () => {
    if (isCooldown) {
      return;
    }

    try {
      setIsCooldown(true);
      if (liked) {
        await dislikePost(accessTokenFromCookie, blog_id);
        setLiked(false);
      } else {
        await likePost(accessTokenFromCookie, blog_id);
        setLiked(true);
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      toast.error('Please Login To Like the Post');
    } finally {
      // Set a timeout to reset isCooldown after 5 seconds
      setTimeout(() => {
        setIsCooldown(false);
      }, 7000);
    }
  };

  const handleRealtedBlogLikeClick = async (index: number, postId: string) => {
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
      console.error('Error liking post:', error);
    }
  };

  const handleFollowClick = async () => {
    try {
      if (!accessToken) {
        toast.error('Please login to follow the user.');
        return;
      }

      if (isFollowing) {
        await unfollowUser(accessToken, userId);
        setIsFollowing(false);
      } else {
        await followUser(accessToken, userId);
        setIsFollowing(true);
        toast.success('You are now following the user.');
      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  const handleSaveClick = async () => {
    if (isCooldown2) {
      return;
    }

    try {
      setIsCooldown2(true);
      if (saved) {
        await unsavePost(accessTokenFromCookie, blog_id);
        setSaved(false);
      } else {
        await savePost(accessTokenFromCookie, blog_id);
        setSaved(true);
      }
    } catch (error) {
      console.error('Error saving/unsaving post:', error);
      toast.error('Please Login To Save the Post');
    } finally {
      // Set a timeout to reset isCooldown after 5 seconds
      setTimeout(() => {
        setIsCooldown2(false);
      }, 7000);
    }
  };

  useEffect(() => {
    if (blogData?.content) {
      try {
        const contentState = JSON.parse(blogData?.content);

        const newEditorState = EditorState.createWithContent(convertFromRaw(contentState));
        setEditorState(newEditorState);
      } catch (error) {
        console.error('Error parsing content data:', error);
      }
    }
  }, [blogData]);

  const handlerealtedSaveClick = async (index: number, realtedBlogId: string) => {
    try {
      if (savedrealtedblog[index]) {
        await unsavePost(accessTokenFromCookie, realtedBlogId);

        setSavedrealtedBlog((prevSavedState) => {
          const updatedSavedState = [...prevSavedState];
          updatedSavedState[index] = false;
          return updatedSavedState;
        });
      } else {
        await savePost(accessTokenFromCookie, realtedBlogId);

        setSavedrealtedBlog((prevSavedState) => {
          const updatedSavedState = [...prevSavedState];
          updatedSavedState[index] = true;
          return updatedSavedState;
        });
      }
    } catch (error) {
      console.error('Error saving/unsaving related blog:', error);
      toast.error('Error in Saving the Post');
    }
  };

  const handletrendingSaveClick = async (index: number, realtedBlogId: string) => {
    try {
      if (savedtrendingblog[index]) {
        await unsavePost(accessTokenFromCookie, realtedBlogId);

        setSavedTrendingBlog((prevSavedState) => {
          const updatedSavedState = [...prevSavedState];
          updatedSavedState[index] = false;
          return updatedSavedState;
        });
      } else {
        await savePost(accessTokenFromCookie, realtedBlogId);

        setSavedTrendingBlog((prevSavedState) => {
          const updatedSavedState = [...prevSavedState];
          updatedSavedState[index] = true;
          return updatedSavedState;
        });
      }
    } catch (error) {
      console.error('Error saving/unsaving related blog:', error);
      toast.error('Error in Saving the Post');
    }
  };
  const [likedComments, setLikedComments] = useState<string[]>([]);

  const handleLikeCommentClick = async (commentId: string) => {
    try {
      if (likedComments.includes(commentId)) {
        // Call the dislikeComment API
        await dislikePostComment(accessTokenFromCookie, commentId);

        // Remove the comment from the likedComments array
        setLikedComments((prevLikedComments) => prevLikedComments.filter((id) => id !== commentId));
      } else {
        // Call the likeComment API
        await likePostComment(accessTokenFromCookie, commentId);

        // Add the comment to the likedComments array
        setLikedComments((prevLikedComments) => [...prevLikedComments, commentId]);
      }
    } catch (error) {
      console.error('Error liking/disliking comment:', error);
    }
  };

  const handleDeleteClick = async (commentId: string) => {
    try {
      // Call the deleteComment API
      await deleteComment(accessTokenFromCookie, commentId);

      // Remove the comment from the list of comments
      setComments((prevComments: any) => prevComments.filter((comment: any) => comment?._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  const handleTitleClick = (blogId: string) => {
    router.push(`/main?blog_id=${blogId}`);
  };
  const dateStr = blogData?.createdAt;
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleDateString(undefined, options);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const handleLogout = async () => {
    setShowPopup(true);
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
  const imageUrl = `https://api.bytebloggerbase.com/public${userProfileData?.img}`;
  const profilePicSrc = imageUrl === 'https://api.bytebloggerbase.com/public/undefined';

  return (
    <>
      {showPopup && <LogoutConfirmationPopup onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />}
      {accessToken && (
        <div className="row1 flex justify-center w-full md:justify-end ms:mb-5 mt-2 md-3">
          <div className="wrapper w-fit flex gap-3 items-center p-1 rounded-b-2xl">
            <div className="img w-[30px] h-[30px]">
              {profilePicSrc ? (
                <Image
                  style={{ width: '30px', height: '30px' }}
                  width={30}
                  height={30}
                  alt="Profile"
                  src="/deafult-user.jpg"
                  className="xl:w-[2rem] rounded-3xl w-[25px]"
                />
              ) : (
                <Image
                  style={{ width: '30px', height: '30px' }}
                  width={30}
                  height={30}
                  alt="Profile Picture"
                  src={imageUrl}
                  className="xl:w-[2rem] rounded-3xl w-[25px]"
                />
              )}
            </div>
            <div className="name flex items-center">
              <h1 className="text-white font-semibold xl:text-sm text-xs">{userProfileData?.name}</h1>
            </div>
            <div className="logout rounded-3xl">
              <button
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-1 px-2 rounded-full shadow-md text-xs cursor-pointer"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="flex  z-10 py-5 overflow-auto">
        {isLoading ? (
          <BlogPostSkeleton />
        ) : (
          <div className="order-1 w-full md:w-[75%] flex flex-col mx-auto ms:h-[100%] h-[95vh] md:pr-[30px]">
            <div className="flex">
              <h1
                id="pageDiv"
                className="text-md lg:text-4xl font-['Poppins'] font-semibold leading-[1.3] text-white relative w-full mb-10 mt-10"
              >
                {blogData?.title}
              </h1>
              {!accessTokenFromCookie && (
                <div>
                  <button className="button-34" onClick={() => router.push(PATH_AUTH.root)}>
                    Home
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-3 w-full items-center mb-3">
              <Image
                width={25}
                height={25}
                alt="test"
                src={`https://api.bytebloggerbase.com/public${blogData?.user_details?.img}`}
                className="w-[30px] h-[30px] shrink-0 rounded-[50%]"
              />
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-start md:flex-row flex-col ml-0 gap-3 md:items-start flex-1 ">
                  <div className="flex  flex-row items-center">
                    <div className="text-sm w-full font-['Poppins'] font-medium leading-[1.2] text-[#d2d2d2] w-[auto]">
                      {blogData?.user_details?.username}
                    </div>

                    {/* <Image width={25} height={25} alt="test2" src="https://file.rendit.io/n/k5mrVfCDc9tO8JNiDnLR.png" className="ml-2" /> */}
                  </div>
                  <div className="flex">
                    <div
                      className={`border-solid border-white bg-white flex flex-col w-auto shrink-0 h-4 items-center py-1 border  w-2/5  h-[20px] rounded cursor-pointer ${
                        isFollowing ? 'bg-gray-200' : ''
                      }`}
                      onClick={handleFollowClick}
                    >
                      <div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-5/5">
                        {isFollowing ? 'Following' : 'Follow'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mr-12 items-center mt-1">
                  <div className="text-xs font-['Inter'] font-light text-[#b7b7b7] ">2 min read</div>
                  <div className="text-xs font-['Inter'] font-light text-[#b7b7b7]">.</div>
                  <div className="text-xs font-['Inter'] font-light  text-[#b7b7b7] ms-1">{formattedDate}</div>
                </div>
              </div>
            </div>
            <div className="m-2">
              <Image
                width={100}
                height={400}
                alt="test5"
                src={`https://api.bytebloggerbase.com/public${blogData?.img}`}
                className="w-[100%] rounded-[30px] MainPage-Logo-Image"
              />
            </div>
            {/* <Image
            width={25}
            height={25}
            className="w-full h-[70%] rounded-[43px] object-cover"
            src="https://img.blogerbase.com/api/upload/KlBLAzhWLU"
            alt="test3"
          /> */}

            <div className="relative flex gap-4 flex-row justify-start flex-wrap mt-4 mb-5">
              {userProfileData?.favCategories?.map((category: string[], index: number) => (
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
                <button className="button-34" onClick={handleConvertToSpeech}>
                  {isSpeaking ? 'Stop Speaking' : 'Convert to Speech!'}
                </button>
                <button className="min-w-0 w-8">
                  <Image
                    width={25}
                    height={25}
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
                <button onClick={() => openShareModal('post')}>
                  <FaIcons.FaShareSquare className="w-10 fill-white w-[32px] h-[32px]" />
                </button>
              </div>
            </div>
            <hr className="opacity-25 bg-light relative bg-white w-full h-[2px]  block mt-5" />
            <div className="flex flex-col flex-wrap gap-20 relative w-full     mt-5">
              <div className="text-lg font-['Poppins'] tracking-[1.6783638191223145] leading-[37.4px] text-white relative">
                <div>
                  <DynamicEditor
                    editorState={editorState}
                    readOnly={true} // Set the editor to read-only
                    toolbarHidden={true} // Hide the toolbar
                  />
                </div>
              </div>

              <p className="text-lg font-['Poppins'] tracking-[1.6783638191223145] leading-[37.4px] text-white relative">
                Thank You for Reading Blog{' '}
              </p>
              <div>
                <div className="flex flex-row gap-3 w-full items-center cursor-pointer mb-4">
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
                    <div
                      className="text-xl font-['Poppins'] font-medium leading-[11px] text-white"
                      onClick={toggleCommentBox}
                    >
                      Comment Your Thoughts....
                    </div>
                    <div className="border-solid border-[#8d8d8d] mr-1 h-px shrink-0 border-t border-b-0 border-x-0" />
                  </div>
                </div>

                <div
                  className={`bg-[#212121] flex-row justify-start flex-column gap-5 relative w-full h-71 items-end pb-2 px-2 rounded-[19.296960830688477px] ${
                    isCommentBoxOpen ? 'block' : 'hidden'
                  }`}
                >
                  <div
                    className="h-[215px] overflow-auto smooth-scroll"
                    style={{ padding: '15px 20px' }}
                    ref={commentsContainerRef}
                  >
                    <div style={{ height: '15px' }}></div>

                    {comments?.map((comment: any) => (
                      <div key={comment.id} className="flex items-center justify-between mb-5">
                        <div className="flex">
                          <Image
                            style={{ width: '38px', height: '38px' }}
                            width={30}
                            height={30}
                            alt="Profile Picture"
                            src={`https://api.bytebloggerbase.com/public${comment?.user_info?.img}`}
                            className="xl:w-[2rem] rounded-3xl w-[25px] mt-1"
                          />
                          <div className="flex flex-col ms-2">
                            <span className="flex">
                              <h3 className="text-white">@{comment?.user_info?.username}</h3>
                              <div className="text-[#ea95ff] text-xs mt-1 ms-2">
                                {formatDateToRelative(comment?.createdAt)}
                              </div>
                            </span>
                            <div className="text-white">{comment.content}</div>
                          </div>
                        </div>

                        <div className="icons flex justify-between items-center gap-2 ">
                          <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center mt-[0] h-full">
                            <button className="min-w-0 mr-px" onClick={() => handleLikeCommentClick(comment?._id)}>
                              {likedComments.includes(comment._id) ? (
                                <FaIcons.FaHeart className="text-white min-h-0 relative w-4 shrink-0" />
                              ) : (
                                <FaIcons.FaRegHeart className="text-white min-h-0 relative w-4 shrink-0 border-white" />
                              )}
                            </button>
                            {userProfileData?._id === comment?.user && (
                              <button className="min-w-0 mr-px" onClick={() => handleDeleteClick(comment?._id)}>
                                <FaIcons.FaTrashAlt className="text-white min-h-0 relative w-4 shrink-0" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div style={{ height: '8px' }}></div>
                  </div>

                  <div className="flex w-full  bottom-5 position-absolute right-0 bottom-[10px]">
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
                        <Image
                          width={25}
                          height={25}
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
                    <Image
                      width={25}
                      height={25}
                      alt="test5"
                      className="min-h-0 min-w-0 mr-1 relative w-6 shrink-0 rounded-[50%]"
                      src={`https://api.bytebloggerbase.com/public${blogData?.user_details?.img}`}
                    />
                    <p className="text-sm font-['Poppins'] font-medium leading-[7.56px] text-white relative inline-block">
                      {blogData?.user_details?.username}
                    </p>
                    <Image
                      width={25}
                      height={25}
                      alt="test5"
                      src="https://file.rendit.io/n/k5mrVfCDc9tO8JNiDnLR.png"
                      className="ml-2 w-5"
                    />
                  </div>
                  <div className="text-xs font-['Poppins'] leading-[11.6px] text-white relative"> 2.5K followers</div>
                  <div className="text-xs font-['Poppins'] font-light leading-[18.6px] text-white relative"></div>
                </div>
                <h3 className="text-xl font-['Poppins'] leading-[1.25] text-white relative w-full text-center mt-5 mb-5">
                  More From {blogData?.user_details?.username}
                </h3>
                <div className="flex items-center mt-5 w-full">
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
                    spaceBetween={25}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{ delay: 1000 }}
                  >
                    <SwiperSlide>
                      <div className="blog-card">
                        <Image
                          width={25}
                          height={25}
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
                        <Image
                          width={25}
                          height={25}
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
                        <Image
                          width={25}
                          height={25}
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
        )}
        {accessToken && (
        <div className="postright order-2 w-[30%] bg-[#101010] bg-opacity-60 md:block hidden sticky top-0">
          <div className="rightwrapper py-5 flex flex-col justify-between">
            <div className="row2 w-[100%] h-[100%] mx-auto flex flex-col gap-5 p-1 rounded-2xl h-auto">
              <div className="title flex items-center justify-center gap-1">
                <h1 className="text-white text-2xl" id="aboutush2">
                  Related Blog
                </h1>
              </div>
              <div className="trendingitems flex flex-col gap-3 h-[300px] lg:h-[400px] overflow-y-scroll scrollbar-hide">
                {isLoading ? (
                  <SideTrendingpostSKeleton />
                ) : (
                  relatedBlogData?.map((post: any, index: number) => (
                    <div className="eachitem flex flex-col bg-[white] p-2 rounded-2xl" key={post?._id}>
                      <div className="title cursor-pointer" onClick={() => handleTitleClick(post?._id)}>
                        <h1 className="font-[600] text-[#2e2e2e] text-[12px]">{post?.title}</h1>
                      </div>
                      <div className="details flex justify-between mt-2">
                        <div className="left flex gap-1 items-center">
                          <div className="prof">
                            <Image
                              width={25}
                              height={25}
                              alt="test8"
                              src="https://file.rendit.io/n/DHgSaM3f3YuNXwHCzdKQ.png"
                              className="w-4"
                            />
                          </div>
                          <div className="writer xl:text-xs text-[10px]">
                            <h1>{post?.name}</h1>
                          </div>
                          <div className="actions flex gap-1 items-center">
                            <button
                              className="min-w-0 mr-px"
                              onClick={() => handleRealtedBlogLikeClick(index, post?._id)}
                            >
                              {likedPosts[index] ? (
                                <FaIcons.FaHeart className="min-h-0 relative w-4 shrink-0" />
                              ) : (
                                <FaIcons.FaRegHeart className="min-h-0 relative w-4 shrink-0" />
                              )}
                            </button>
                            <button className="min-w-0 mr-px" onClick={() => handlerealtedSaveClick(index, post?._id)}>
                              {savedrealtedblog[index] ? (
                                <FaIcons.FaBookmark className="min-h-0 relative w-4 shrink-0" />
                              ) : (
                                <FaIcons.FaRegBookmark className="min-h-0 relative w-4 shrink-0" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="right flex items-center">
                          <div className="views bg-[#6dc993] font-bold rounded-2xl px-1 xl:text-xs text-[10px]">
                            {post?.likes}{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <span className="text-base font-['Poppins'] tracking-[0.9100434494018554] leading-[9.55px] text-white mt-3 relative inline-block">
                See All
              </span>
            </div>
            <div className="row2 w-[100%] mx-auto flex flex-col gap-5 p-1 rounded-2xl h-auto mt-8">
              <div className="title flex items-center justify-center gap-1">
                <h1 className="text-white text-2xl" id="aboutush2">
                  Trending
                </h1>
              </div>
              <div className="trendingitems flex flex-col gap-3 h-[300px]  lg:h-[400px] overflow-y-scroll scrollbar-hide">
                {isLoading ? (
                  <SideTrendingpostSKeleton />
                ) : (
                  trendingpostData?.map((item: any, index: number) => (
                    <div key={index} className="eachitem flex flex-col bg-[white] p-2 rounded-2xl">
                      <div className="title cursor-pointer" onClick={() => handleTitleClick(item?._id)}>
                        <h1 className="font-[600] text-[#2e2e2e] text-[12px]">{item.title}</h1>
                      </div>
                      <div className="details flex justify-between mt-2">
                        <div className="left flex gap-1 items-center">
                          <div className="prof rounded-3">
                            <Image
                              width={25}
                              height={25}
                              alt={`user-${index}`}
                              src={`https://api.bytebloggerbase.com/public${item.user_details?.img}`}
                              className="w-4 rounded-lg"
                            />
                          </div>
                          <div className="writer xl:text-xs text-[10px]">
                            <h1>{item.user_details?.name}</h1>
                          </div>
                          <div className="actions flex gap-1 items-center">
                            <button className="min-w-0 mr-px" onClick={() => handletrendingSaveClick(index, item?._id)}>
                              {savedtrendingblog[index] ? (
                                <FaIcons.FaBookmark className="min-h-0 relative w-4 shrink-0" />
                              ) : (
                                <FaIcons.FaRegBookmark className="min-h-0 relative w-4 shrink-0" />
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
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <span className="text-base font-['Poppins'] tracking-[0.9100434494018554] leading-[9.55px] text-white mt-3 relative inline-block">
              See All
            </span>
          </div>
        </div>
        )}
      </section>
      {isShareModalOpen && <ShareModal shareType={shareType} onClose={closeShareModal} shareurl={shareUrl} />}
    </>
  );
}

export default MainPage;
