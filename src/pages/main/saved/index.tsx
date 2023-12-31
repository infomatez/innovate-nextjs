import { GetServerSideProps } from 'next';
import { getUserProfile } from '@/src/services/user';
import { useAuth } from '@/src/context/authContext';
import LogoutConfirmationPopup from '@/src/components/LogoutModal/LogoutConfirmationPopup';
import SavedBlogsSkeleton from '@/src/components/Skeleton/SavedBlogsSkeleton';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { withAuthServerSideProps } from '@/src/components/PrivateRoutes/withAuthServerSideProps';
import Cookies from 'js-cookie';
import UserPanelLayout from '@/src/layouts/admin/nav';
import { getAllSavePostsbyUserId } from '@/src/services/post';

function SavedBlogPage() {
  const router = useRouter();
  const { removeAccessToken, accessToken } = useAuth();
  const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');

  const [userSavedProfileData, setUserSaveProfile] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleTitleClick = (blogId: string) => {
    router.push(`/main?blog_id=${blogId}`);
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userSavedProfileData = await getAllSavePostsbyUserId(accessToken);
        setUserSaveProfile(userSavedProfileData?.data[0]?.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [accessToken]);

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
              <h1 className="text-white font-semibold xl:text-sm text-xs">{userSavedProfileData?.name}</h1>
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
            <p className={`${styles.sectionSubText} text-slate-400`}>Read at your own leisure!</p>
            <h2 className={styles.sectionHeadText} id="aboutush2">
              Saved Blogs
            </h2>
          </div>
          <div className={`${styles.padding} -mt-14 md:-mt-20 pb-14 flex flex-wrap justify-around gap-7`}>
            <div className="grid grid-cols-12 gap-4 w-full gap-7 h-full overflow-y-scroll scrollbar-hide">
              {isLoading ? (
                <SavedBlogsSkeleton />
              ) : (
                userSavedProfileData?.map((post: any, index: number) => (
                  <div
                    className="blog-bg-ct p-5 rounded-2xl mt-16 w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto cursor-pointer"
                    onClick={() => handleTitleClick(post?._id)}
                    key={index}
                  >
                    <div className="relative w-full sm:h-[230px] h-fit">
                      <img
                        src={`https://api.bytebloggerbase.com/public${post?.img}`}
                        alt="name"
                        className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                      />
                    </div>
                    <div className="mt-5">
                      <h3 className="text-white font-bold sm:text-[24px] text-[14px] cursor-pointer">{post?.title}</h3>
                      <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">{post?.sort_content}</p>
                    </div>
                    <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                      {post?.tags?.map((tag: any, index: number) => (
                        <p className="text-[14px]" key={index}>
                          #{tag}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

SavedBlogPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default SavedBlogPage;

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
