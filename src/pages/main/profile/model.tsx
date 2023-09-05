import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getUserFollowers, getUserFollowing } from '../../../services/user';
import Cookies from 'js-cookie';
import { followUser, unfollowUser } from '../../../services/user'; // Import your API functions

const Modal = ({ userProfile, onClose }: any) => {
    const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');
    console.log(userProfile._id);

    const [activeTab, setActiveTab] = useState('tab1');
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const initialfollowers = followers?.map((follower: any, index) =>
    follower?.followers?.includes(userProfile._id)
  );
    const [isLoading, setIsLoading] = useState(false); // Loading state for API calls

    const closeModal = () => {
        onClose();
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (activeTab === 'tab1') {
                    console.log('Fetching followers...');
                    const followersData = await getUserFollowers(
                        accessTokenFromCookie,
                        userProfile._id
                    );
                    console.log('Followers data:', followersData?.data?.follower_details);
                    setFollowers(followersData?.data?.follower_details);
                } else {
                    console.log('Fetching following...');
                    const followingData = await getUserFollowing(
                        accessTokenFromCookie,
                        userProfile._id
                    );
                    console.log('Following data:', followingData?.data[0]?.following_details);
                    setFollowing(followingData?.data[0]?.following_details);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [activeTab, userProfile]);


    const handleFollowClick = async (userId: string) => {
        setIsLoading(true);

        try {
            // Call the followUser API
            await followUser(accessTokenFromCookie, userId);

            // Refresh the followers or following data after following
            if (activeTab === 'tab1') {
                const followersData = await getUserFollowers(accessTokenFromCookie, userProfile._id);
                setFollowers(followersData?.data?.follower_details);
            } else {
                const followingData = await getUserFollowing(accessTokenFromCookie, userProfile._id);
                setFollowing(followingData?.data?.following_details);
            }
        } catch (error) {
            console.error('Error following user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnfollowClick = async (userId: string) => {
        setIsLoading(true);
      
        try {
          // Call the unfollowUser API
          await unfollowUser(accessTokenFromCookie, userId);
      
          // Remove the unfollowed user from the followers or following list
          if (activeTab === 'tab1') {
            // Filter out the unfollowed user from the followers list
            setFollowers((prevFollowers) => prevFollowers.filter((follower) => follower._id !== userId));
          } else {
            // Filter out the unfollowed user from the following list
            setFollowing((prevFollowing) => prevFollowing.filter((following) => following._id !== userId));
          }
        } catch (error) {
          console.error('Error unfollowing user:', error);
        } finally {
          setIsLoading(false);
        }
      };
      

    // Rest of your component code...

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 mx-[20px] modelbox">
            <div className="absolute inset-0 bg-[#000] opacity-50"></div>
            <div className="relative z-10 bg-[#262626]  p-0 w-96 rounded-lg shadow-lg">
                <button className="absolute top-2 right-2 text-white" onClick={closeModal}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="mb-2 w-full flex border-b border-[#434343]">
                    <button
                        className={`${activeTab === 'tab1' ? 'bg-blue-500 text-white' : ''
                            } px-4 py-2 bg-transparent text-white flex-1`}
                        onClick={() => setActiveTab('tab1')}
                    >
                        Followers
                    </button>
                    <button
                        className={`${activeTab === 'tab2' ? 'bg-blue-500 text-white' : ''
                            } px-4 py-2 bg-transparent text-white flex-1`}
                        onClick={() => setActiveTab('tab2')}
                    >
                        Following
                    </button>
                </div>
                <div className="px-4 pt-2 h-[100%]">
                    {activeTab === 'tab1' ? (
                        <div className='overflow-auto h-[330px] flex flex-col'>
                            {followers?.length === 0 ? (
                                <p className="text-white text-[10.80px] font-normal leading-[1.3] tracking-wide text-center">
                                    No followers
                                </p>
                            ) : (
                                followers?.map((follower: any,index) => (
                                    <div className='follower-list flex justify-between items-center mb-3' key={follower._id}>
                                        <div className='flex items-center'>
                                            <Image
                                                src={follower.img}
                                                height="48"
                                                width="48"
                                                className='rounded-[50%] mr-3'
                                                alt='Follower Dp'
                                            />
                                            <div className='follow-info'>
                                                <h5 className="text-white text-sm font-semibold leading-[1.5] tracking-wide">
                                                    {follower.username}
                                                </h5>
                                                <p className="text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">
                                                    {follower.name}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-2 m-2 w-[80px] p-2 border rounded"
                                            onClick={() => handleFollowClick(follower._id)}
                                            disabled={isLoading} // Disable the button while the API call is in progress
                                        >
                                            <div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[0.58px] text-[#ad00ff] w-5/5">
                                                {initialfollowers[index]
                                                        ? 'Following'
                                                        : 'Follow'}
                                            </div>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className='overflow-auto h-[330px] flex flex-col'>
                            {following?.length === 0 ? (
                                <p className=" text-[10.80px] font-normal leading-[1.3] tracking-wide text-white text-center">
                                    You Do not Follow Anyone
                                </p>
                            ) : (
                                following?.map((following: any) => (
                                    <div className='follower-list flex justify-between items-center mb-3' key={following._id}>
                                        <div className='flex items-center'>
                                            <Image
                                                src={following.img}
                                                height="48"
                                                width="48"
                                                className='rounded-[50%] mr-3'
                                                alt='Following Dp'
                                            />
                                            <div className='follow-info'>
                                                <h5 className="text-white text-sm font-semibold leading-[1.5] tracking-wide">
                                                    {following.username}
                                                </h5>
                                                <p className="text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">
                                                    {following.name}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-2 m-2 w-[80px] p-2 border rounded"

                                            onClick={() => handleUnfollowClick(following._id)}
                                            disabled={isLoading} // Disable the button while the API call is in progress
                                        >
                                            <div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[0.58px] text-[#ad00ff] w-5/5">

                                                Unfollow
                                            </div>
                                        </button>
                                    </div>
                                ))
                            )}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;