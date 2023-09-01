import { filters } from '@/src/utils/constant';
import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import LogoIcon from '@/public/byteBlogger1.png';
import Image from 'next/image';
import { getUserProfile, editUserProfile } from "../../../services/user"
import { useAuth } from '@/src/context/authContext';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

interface IProfileEditForm {
  username: string;
  name: string;
  bio: string;
  socialLinks: string;
}

const ProfileEdit = () => {
  const accessTokenFromCookie = Cookies.get('accessToken');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [favCategories, setFavCategories] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { register, handleSubmit, setValue } = useForm<IProfileEditForm>({
    defaultValues: {
      username: userProfile?.message[0]?.username || '',
      name: userProfile?.message[0]?.name || '',
      bio: userProfile?.message[0]?.bio || '',
      socialLinks: userProfile?.message[0]?.socialLinks?.join('\n') || '',
    },
  });

  const onSubmit: SubmitHandler<IProfileEditForm> = async (data: IProfileEditForm) => {
    try {
      const updatedProfileData = {
        username: data.username,
        profilename: data.name,
        bio: data.bio,
        sociallinks: data.socialLinks?.split('\n').map(link => link.trim()),
        profilepic: profileImage?.name, 
      };

            const result = await editUserProfile(accessTokenFromCookie, updatedProfileData);

      console.log('Profile updated:', result);
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error('Error updating profile', error);
      toast.error('Error updating profile');
    }
  };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log('Fetching user profile...');
                const userProfileData = await getUserProfile(accessTokenFromCookie);
                console.log('Fetched user profile:', userProfileData);
                setUserProfile(userProfileData);
                setValue('username', userProfileData?.message[0]?.username || '');
                setValue('name', userProfileData?.message[0]?.name || '');
                setValue('bio', userProfileData?.message[0]?.bio || '');
                setValue('socialLinks', userProfileData?.message[0]?.socialLinks?.join('\n') || '');
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

  const handleFavCategory = (value: string) => {
    if (favCategories.includes(value)) {
      setFavCategories((prev) => prev.filter((category) => category !== value));
    } else {
      setFavCategories((prev) => [...prev, value]);
    }
  };
  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length) {
      const originalFile = files[0];
      
      // Extract the original filename
      const originalFilename = originalFile.name;
      
      // Construct the desired filename using lastModified timestamp and original filename
      const timestamp = originalFile.lastModified;
      const filename = `${timestamp}_${originalFilename}`;
      
      // Create a new File object with the desired filename
      const newFile = new File([originalFile], filename, { type: originalFile.type });
      
      setProfileImage(newFile);
    }
  };
  console.log(profileImage,"-------------------------");
  

    return (
        <div className="mt-8 bg-sidebar w-full rounded-2xl p-0 md:py-[30px] md:px-[30px] xl:py-14 xl:px-[82px] mb-14">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 sm:gap-12 ">
                    <div className="flex flex-col gap-4 col-span-12 md:col-span-6 order-2 sm:order-1 mt-7 md:mt-0">
                        <div>
                            <label htmlFor="userName" className="text-white font-inter text-xs font-semibold mb-1">
                                Username
                            </label>
                            <input
                                id="userName"
                                {...register('username')}
                                className="rounded-[10px] w-full py-2 text-sm sm:text-base sm:py-4  text-[#fff]  font-poppins outline-none bg-[#252525] pl-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="text-white font-inter text-xs font-semibold mb-1">
                                Profile name
                            </label>
                            <input
                                id="name"
                                {...register('name')}
                                className="rounded-[10px] w-full py-2 text-sm sm:text-base sm:py-4  text-[#fff]  font-poppins outline-none bg-[#252525] pl-3"

                            />
                        </div>
                        <div>
                            <label htmlFor="bio" className="text-white font-inter text-xs font-semibold mb-1">
                                Bio
                            </label>
                            <textarea
                                rows={4}
                                id="bio"
                                className="resize-none rounded-[10px] w-full py-2 text-sm sm:text-base sm:py-4  text-[#fff]  font-poppins outline-none bg-[#252525] pl-3"

                {...register('bio')}
              />
            </div>
            <div>
              <label htmlFor="socialLinks" className="text-white font-inter text-xs font-semibold mb-1">
                Enter Social Media Links
              </label>
              <textarea
                rows={2}
                id="socialLinks"
                {...register('socialLinks')}
                className="resize-none rounded-[10px] w-full py-2 text-sm sm:text-base sm:py-4 text-[#fff] font-poppins outline-none bg-[#252525] pl-3"
              />
            </div>
          </div>
          <div className="flex flex-row-reverse sm:flex-col col-span-12 sm:col-span-6 order-1 sm:order-2">
            <div className="mt-9 sm:mt-0">
              <p className="ml-7 sm:ml-10 text-white text-inter font-semibold text-xs mb-2 sm:mb-0">
                Favorite Categories
              </p>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2 ">
                {filters.map((f, index) => (
                  <button
                    type="button"
                    key={`filter-button-${index}`}
                    className="btn favCategoryBtn whitespace-nowrap w-fit"
                    style={favCategories.includes(f.text) ? { background: 'white', color: 'black' } : {}}
                    onClick={() => {
                      handleFavCategory(f.text);
                    }}
                  >
                    {f.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex sm:flex-row flex-col sm:mt-12 items-center gap-4 sm:ml-10 ">
              <Image src={LogoIcon} fill={true} alt="logo icon" className="sm:hidden block" />
              {profileImage ? (
                <Image
                src={URL.createObjectURL(profileImage)} 

                  // fill={true}
                  height={24} width={25}
                  className="rounded-lg object-contain sm:w-52 w-28 h-24 sm:h-52"
                  alt="profile image"
                />
              ) : (
                <div className="rounded-lg border-[1.5px] border-[#929292] sm:w-52 w-28 h-24 sm:h-52 flex justify-center items-center">
                  <p className="text-white text-[6px] sm:text-xs whitespace-nowrap">Preview Image</p>
                </div>
              )}
              <div className="flex gap-4">
                <input
                  type="file"
                  id="profileImage"
                  className="hidden"
                  name="previewImage"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
                <label
                  htmlFor="profileImage"
                  className="rounded-[20px] sm:p-[6px] p-1 bg-[#a801df] whitespace-nowrap text-white font-inter text-[6px] sm:text-sm font-semibold"
                >
                  Change Profile Photo
                </label>
                <button
                  onClick={() => setProfileImage(null)}
                  type="button"
                  className="p-1 rounded-[20px] sm:p-[6px] bg-[#b9b9b9] whitespace-nowrap text-black font-inter text-[6px] sm:text-sm font-medium"
                >
                  Remove Photo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-24">
          <button className="rounded-[20px] py-1 sm:py-3 px-2 sm:px-4 bg-[#a801df] text-white font-inter text-xs sm:text-lg font-semibold" onClick={handleSubmit(onSubmit)}>
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProfileEdit;
