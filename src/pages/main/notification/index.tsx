/* eslint-disable react/no-unescaped-entities */
import UserPanelLayout from '@/src/layouts/admin/nav';
import { GetServerSideProps } from 'next';
import { withAuthServerSideProps } from '@/src/components/PrivateRoutes/withAuthServerSideProps';
import { getUserAllNotifications } from '@/src/services/hall-of-fame';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import router from 'next/router';
import { useAuth } from '@/src/context/authContext';
import LogoutConfirmationPopup from '@/src/components/LogoutModal/LogoutConfirmationPopup';

NotificationPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function NotificationPage() {
  const { removeAccessToken } = useAuth();
  const [fetchUserNotification, setUserNotification] = useState<any>(null);
  const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');
  const [showPopup, setShowPopup] = useState(false);

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
    const fetchUserNotification = async () => {
      try {
        const userProfileData = await getUserAllNotifications(accessTokenFromCookie);
        setUserNotification(userProfileData?.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserNotification();
  }, []);



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
      "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] font-family: 'Fjalla One'",
    sectionSubText: 'sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider',
  };
  return (
    <>
      {showPopup && <LogoutConfirmationPopup onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />}
      <section className="wrapper w-full px-2 py-10">
        <div className="row1 flex justify-center w-full md:justify-end ms:mb-5 mb-3 md-3">
          <div className="wrapper w-fit flex gap-3 items-center p-1 rounded-b-2xl">
            <div className="name flex items-center">
              <h1 className="text-white font-semibold xl:text-sm text-xs">{fetchUserNotification?.name}</h1>
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
        <div className="bg-black-100 rounded-[20px] h-full overflow-y-scroll scrollbar-hide">
          <div className={`${styles.padding} sidebar-bg-ct rounded-2xl`}>
            <p className={`${styles.sectionSubText} text-slate-400`}>See What's New!</p>
            <h2 className={styles.sectionHeadText} id="aboutush2">
              Notifications
            </h2>
          </div>
          <div className="mt-4 py-4 px-4 md:px-8">
            {fetchUserNotification?.map((notification: any) => (
              <div className="bg-[#1f1f1f] rounded-[10px] p-4 shadow-md mb-4" key={notification?._id}>
                <div className="flex md:items-center cursor-pointer" onClick={() => handleTitleClick(notification?.post_id)}>
                  <div className="mt-2 mr-2">
                    <svg
                      width="25"
                      className="w-[20px] h-[20px] md:w-[45px] md:h-[45px]"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5138 8.07617C18.5138 6.48487 17.8817 4.95875 16.7564 3.83353C15.6312 2.70831 14.1051 2.07617 12.5138 2.07617C10.9225 2.07617 9.39637 2.70831 8.27115 3.83353C7.14594 4.95875 6.51379 6.48487 6.51379 8.07617C6.51379 15.0762 3.51379 17.0762 3.51379 17.0762H21.5138C21.5138 17.0762 18.5138 15.0762 18.5138 8.07617Z"
                        stroke="#bf02b5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.2438 21.0762C14.068 21.3792 13.8157 21.6308 13.512 21.8057C13.2084 21.9806 12.8642 22.0726 12.5138 22.0726C12.1634 22.0726 11.8192 21.9806 11.5156 21.8057C11.212 21.6308 10.9596 21.3792 10.7838 21.0762"
                        stroke="#bf02b5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{notification?.type}</p>
                    <p className="text-sm text-white opacity-50">{notification?.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
