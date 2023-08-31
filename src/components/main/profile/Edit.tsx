import { filters } from '@/src/utils/constant';
import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import LogoIcon from '@/public/byteBlogger1.png';
import Image from 'next/image';
import { getUserProfile, editUserProfile } from "../../../services/user"
import { useAuth } from '@/src/context/authContext';
import Cookies from 'js-cookie';

interface IProfileEditForm {
    username: string;
    name: string;
    bio: string;
    sociallinks: string;
}

const ProfileEdit = () => {
    const accessTokenFromCookie = Cookies.get('accessToken');
    const [userProfile, setUserProfile] = useState<any>(null);
    const [favCategories, setFavCategories] = useState<string[]>([]);
    const [profileImage, setProfileImage] = useState<string>('');
    const { register, handleSubmit, setValue } = useForm<IProfileEditForm>({
        defaultValues: {
            username: userProfile?.message[0]?.username || '',
            profilename: userProfile?.message[0]?.name || '',
            bio: userProfile?.message[0]?.bio || '',
            sociallinks: userProfile?.message[0]?.socialLinks?.join('\n') || '',
        },
    });

    const onSubmit: SubmitHandler<IProfileEditForm> = async (data: IProfileEditForm) => {
        try {
            const updatedProfileData = {
                username: data.username,
                profilename: data.name,
                bio: data.bio,
                sociallinks: data.socialLinks?.split('\n').map(link => link.trim()), // Split and clean the links
                // ... (other data to update)
            };

            const result = await editUserProfile(accessTokenFromCookie, updatedProfileData);

            console.log('Profile updated:', result);
        } catch (error) {
            console.error('Error updating profile:', error);
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
            const imageUrl = URL.createObjectURL(files[0]);
            setProfileImage(imageUrl);
        }
        event.target.value = '';
    };

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
                    <div className="flex flex-col-reverse sm:flex-col col-span-12 md:col-span-6 order-1 md:order-2">
                        <div className="mt-9 sm:mt-0 flex-1">
                            <p className=" text-white text-inter font-semibold text-xs mb-2 sm:mb-0">
                                Favorite Categories
                            </p>
                            <div className="grid grid-cols-12 justify-center gap-1 sm:gap-2 mt-4 flex-1">
                                {/* {filters.map((f, index) => (
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
                                ))} */}
                                {filters.map((f, index) => (
                                    <label key={`filter-checkbox-${index}`} htmlFor={f.text+'test'} className="checkbox-container flex items-center cursor-pointer col-span-6 md:col-span-4 lg:col-span-3">
                                        <input
                                            type="checkbox"
                                            checked={favCategories.includes(f.text)}
                                            onChange={() => handleFavCategory(f.text)}
                                            className="hidden"
                                            id={f.text+'test'}
                                        />
                                        <span className={`w-auto text-[10px] py-1 checkmark border border-[#ab01fa] w-full text-center text-white bg-[#ab01fa] rounded ${favCategories.includes(f.text) ? 'bg-white text-[#000]' : ''}`}><span>{f.text}</span></span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <style>
                        {`.checkbox-container input:checked + .checkmark {
                            background-color: white;
                            border-color: black;
                        }`}
                        </style>
                        <div className="flex sm:flex-row flex-col sm:mt-12 items-center gap-4 sm:ml-0 ">
                            <Image src={LogoIcon} height="50" width={150} alt="logo icon" className="sm:hidden block" />
                            {profileImage ? (
                                <Image
                                    src={profileImage}
                                    fill={true}
                                    // height={24} width={100}
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
                                <div className='d-flex flex-wrap gap-5'>
                                    <label
                                        htmlFor="profileImage"
                                        className="rounded-[20px] inline-block mx-2 sm:p-[6px] p-1 bg-[#a801df] text-white font-inter text-[6px] sm:text-[12px] font-semibold mt-4"
                                    >
                                        Change Profile Photo
                                    </label>
                                    <button
                                        onClick={() => setProfileImage('')}
                                        type="button"
                                        className="p-1 rounded-[20px] inline-block mx-2 mt-4 sm:p-[6px] bg-[#b9b9b9] text-black font-inter text-[6px] sm:text-[12px] font-medium"
                                    >
                                        Remove Photo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-14 mb-14">
                    <button className="rounded-[20px] py-1 sm:py-3 px-2 sm:px-4 bg-[#a801df] text-white font-inter text-xs sm:text-lg font-semibold" onClick={handleSubmit(onSubmit)}>
                        Edit Profile
                    </button>
                </div>
            </form>
        </div>
    );
};
export default ProfileEdit;
