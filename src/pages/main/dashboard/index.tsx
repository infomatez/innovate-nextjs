import UserPanelLayout from "@/src/layouts/admin/nav";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/src/components/PrivateRoutes/withAuthServerSideProps";
import { FaSearch } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";
import { useAuth } from "@/src/context/authContext";
import { followUser, getUserFollowing, getUserProfile, unfollowUser } from "@/src/services/user";
import { dislikePost, getAllPosts, getAllPostsbyUserId, getTrendingPosts, likePost, savePost, unsavePost } from "@/src/services/post";

import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import ShareModal from "../profile/ShareModal";

dashboard.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

const ExperienceCard = ({ title, img, content, createdAt, userName, id, accessToken, userProfile, userPosts, key, blogId, onDataReceived, index }: any) => {


    const initialFollowUser = userProfile?.followers?.includes(id)
    const [isFollowing, setIsFollowing] = useState(initialFollowUser || false);

    function formatDate(inputDate: any) {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}-${month}-${year}`;
    }
    const formattedDate = formatDate(createdAt);


    const initialsavePost = userProfile?.savedPosts.includes(blogId)
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
    const initialLikedPosts = userPosts?.map((post: any) =>
        post?.likedBy?.includes(userProfile?._id)
    ) || [];
    console.log(initialFollowUser, "ppppppppppppp");

    const [likedPosts, setLikedPosts] = useState<boolean[]>(initialLikedPosts);


    useEffect(() => {

        const initialLikedPosts = userPosts?.map((post: any) =>
            post?.likedBy?.includes(userProfile?._id)
        ) || [];

        setLikedPosts(initialLikedPosts);


        const initialsavePost = userProfile?.savedPosts.includes(blogId)
        setSaved(initialsavePost)
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
            toast.error("Please Login To Save the Post")

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
            console.error('Error liking/disliking post:', error);
        }
    };



    const openShareModal = (type) => {
        if (type === 'post') {
            const shareUrl = `${window.location.origin}/main?blog_id=${blogId}`;
            onDataReceived(type, blogId, shareUrl);
        }
    };


    return (
        <VerticalTimelineElement
            contentStyle={{ background: "#1d1836", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #232631" }}
            date={formattedDate}
            className="cursor-pointer"
            icon={
                <div className="flex justify-center items-center w-full h-full">
                    <Image
                        src={`http://localhost:9000/public/${img}`}
                        alt="blog_img"
                        width={200}
                        height={200}
                        style={{ borderRadius: '50%' }}
                    />
                    {/* <Image
                        src="https://images.theconversation.com/files/479421/original/file-20220816-10908-uvh62x.jpg?ixlib=rb-1.1.0&rect=4%2C5%2C994%2C497&q=45&auto=format&w=668&h=324&fit=crop" 
                        width={200}
                        height={200}
                    /> */}
                </div>
            }
        >
            <div className="relative">
                <div className="flex justify-end card-img_hover">
                    <div className="bg-black w-10 h-10 rounded-full border border-1 border-purple-500 flex justify-center items-center cursor-pointer"></div>
                </div>
                <div className="title">
                    <h3 className="text-white text-[24px] font-bold" id="aboutush2">
                        {title}
                    </h3>
                </div>
                <div className="flex justify-start items-center mt-2">
                    <p
                        className="text-secondary text-[16px] font-semibold"
                        style={{
                            margin: 0,
                            marginRight: "10px",
                        }}
                    >
                        {userName}
                    </p>
                    <div className="status">
                        <button className="border border-[#cc00ff] rounded-2xl py-1 px-2 text-sm font-semibold" onClick={handleFollowClick}>
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    </div>
                </div>
            </div>
            <p>
                {content}
            </p>
            <div className="icons flex justify-between items-center gap-2 mt-5">
                <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center mt-[0] h-full">
                    <button className="min-w-0 mr-px" onClick={() => handleLikeClick(index, blogId)}>
                        {likedPosts[index] ? (
                            <FaIcons.FaHeart className="min-h-0 relative w-4 shrink-0" />
                        ) : (
                            <FaIcons.FaRegHeart className="min-h-0 relative w-4 shrink-0" />
                        )}
                    </button>
                    <button className="min-w-0 mr-px"  onClick={handleSaveClick}>
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
                <button className="button-34">
                    Convert to speech!
                </button>
            </div>
        </VerticalTimelineElement>
    );
};

export default function dashboard() {

    const { accessToken } = useAuth();



    const [userProfile, setUserProfile] = useState<any>(null);
    const [userPosts, setUserPosts] = useState<any>([]);
    const [trendingpostData, setTrendingPostdata] = useState<any>(null)
    const [following, setFollowing] = useState([]);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareType, setShareType] = useState<'profile' | 'post'>('profile');
    const [shareurl, setShareUrl] = useState("")



    useEffect(() => {
        const fetchUserProfileAndPosts = async () => {
            try {
                const userProfileData = await getUserProfile(accessToken);
                setUserProfile(userProfileData?.message[0]);

                const userId = userProfileData?.message[0]?._id;
                const posts = await getAllPosts(accessToken, 10, 0);
                setUserPosts(posts?.data[0]?.data);

                const trendingpostresponse = await getTrendingPosts(accessToken, 10, 0)
                setTrendingPostdata(trendingpostresponse?.data[0]?.data)

                const followingData = await getUserFollowing(accessToken, userId);
                setFollowing(followingData?.data[0]?.following_details);

            } catch (error) {
                console.error('Error fetching user profile and posts:', error);

            }
        };
        fetchUserProfileAndPosts();

    }, [accessToken]);

    const receiveDataFromChild = (type: any, postId: string, url: string) => {
        setShareType(type);
        setIsShareModalOpen(true);
        if (postId) {
            setShareUrl(url);
        }
    };
    const closeShareModal = () => {
        setIsShareModalOpen(false);
    };


    const styles = {
        paddingX: "sm:px-16 px-6",
        paddingY: "sm:py-16 py-6",
        padding: "sm:px-16 px-6 sm:py-16 py-10",

        heroHeadText:
            "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
        heroSubText:
            "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",
        heroSubText2:
            "text-[#dfd9ff] font-medium lg:text-[20px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",

        sectionHeadText:
            "text-white text-center  font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] font-family: 'Fjalla One'",
        sectionSubText:
            "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
    };

    return (
        <>
            <section className="flex z-10 py-5 overflow-auto">
                <div className="order-1 w-full md:w-[75%] flex flex-col mx-auto ms:h-[100%] h-[95vh] pr-[30px]">
                    <div className="text-white bg-[#393939] rounded-3xl py-1 px-3 mt-2 flex justify-between items-center mx-10 w-[85%]">
                        <div className="left flex gap-3">
                            <div className="search">
                                <input
                                    type="text"
                                    placeholder="Search Blog..."
                                    className="bg-[#393939] placeholder-white focus:outline-none text-sm"
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
                    <div className="mt-10 w-full flex flex-col overflow-y-scroll scrollbar-hide">
                        <VerticalTimeline>
                            {userPosts.map((post: any, index: number) => (
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
                                    userPosts={userPosts}
                                    onDataReceived={receiveDataFromChild}
                                />
                            ))}
                        </VerticalTimeline>
                    </div>
                </div>
                <div className="postright order-2 w-[22%] bg-[#101010] bg-opacity-60 md:block hidden sticky top-0">
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
                                <div className="trendingitems flex flex-col gap-3 h-[300px]  lg:h-[400px] overflow-y-scroll scrollbar-hide p-6">
                                    {following.map((user: any) => (
                                        <a href="#" className="text-white" key={user._id}>
                                            <h5 className="inline-block">{user.name}</h5>
                                            {user?.verified === "true" ? <MdIcons.MdVerified className="fill-[blue] inline-block" /> : ""}
                                        </a>
                                    ))}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isShareModalOpen && (
                <ShareModal shareType={shareType} onClose={closeShareModal} shareurl={shareurl} />
            )}
        </>
    )
}



export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
