import { filters } from '@/src/utils/constant';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import LogoIcon from '@/public/byteBlogger1.png';
import Image from 'next/image';

interface IProfileEditForm {
  username: string;
  profileName: string;
  bio: string;
  socialMediaLinks: string;
}
const ProfileEdit = () => {
  const [favCategories, setFavCategories] = useState(['']);
  const [profileImage, setProfileImage] = useState('');
  const { register, handleSubmit } = useForm<IProfileEditForm>();
  const onSubmit: SubmitHandler<IProfileEditForm> = (data: IProfileEditForm) => {
    console.log({ data });
  };

  const handleFavCategory = (value: string) => {
    const isCategoryExists = favCategories.includes(value);
    if (!isCategoryExists) {
      return setFavCategories((prev) => [...prev, value]);
    }
    setFavCategories((prev) => prev.filter((category) => category != value));
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length) {
      const imageUrl = URL.createObjectURL(files[0]);
      setProfileImage(imageUrl);
    }
    event.target.value = '';
  };

  return (
    <div className="mt-8 bg-sidebar h-[90vh] w-full rounded-2xl sm:py-14 sm:px-[82px] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 sm:gap-12 ">
          <div className="flex flex-col gap-4 col-span-12 sm:col-span-6 order-2 sm:order-1 mt-7 sm:mt-0">
            <div>
              <label htmlFor="userName" className="text-white font-inter text-xs font-semibold mb-1">
                Username
              </label>
              <input
                id="userName"
                className="rounded-[10px] w-full py-2 text-sm sm:text-base sm:py-4  text-[#fff]  font-poppins outline-none bg-[#252525] pl-3"
                {...register('username')}
              />
            </div>
            <div>
              <label htmlFor="profileName" className="text-white font-inter text-xs font-semibold mb-1">
                Profile name
              </label>
              <input
                id="profileName"
                className="rounded-[10px] w-full py-2 text-sm sm:text-base sm:py-4  text-[#fff]  font-poppins outline-none bg-[#252525] pl-3"
                {...register('username')}
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
                {...register('username')}
              />
            </div>
            <div>
              <label htmlFor="socialLinks" className="text-white font-inter text-xs font-semibold mb-1">
                Enter Social Media Links
              </label>
              <textarea
                rows={2}
                id="socialLinks"
                className=" resize-none rounded-[10px] w-full py-2 text-sm sm:text-base sm:py-4  text-[#fff]  font-poppins outline-none bg-[#252525] pl-3"
                {...register('username')}
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
              <Image src={LogoIcon} fill={true} height={24} width={100} alt="logo icon" className="sm:hidden block" />
              {profileImage ? (
                <Image
                  src={profileImage}
                  fill={true}
                  height={24} width={100}
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
                  onClick={() => setProfileImage('')}
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
          <button className="rounded-[20px] py-1 sm:py-3 px-2 sm:px-4 bg-[#a801df] text-white font-inter text-xs sm:text-lg font-semibold">
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProfileEdit;
