import UserPanelLayout from '@/src/layouts/admin/nav';
import { PATH_DASHBOARD, PATH_PROFILE } from '@/src/routes/path';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as FaIcons from 'react-icons/fa';
ProfilePage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="profilewrapper flex flex-col  w-full items-center ms:h-auto">
      <div className="row1 flex justify-center w-full md:justify-end ms:mb-5 md-3">
        <div className="wrapper w-fit flex gap-1 items-center p-1 rounded-b-2xl">
          <div className="img">
            <Image
              alt="test1"
              src="https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c"
              className="xl:w-[2rem] rounded-3xl w-[25px]"
            />
          </div>
          <div className="name flex items-center">
            <h1 className="text-white font-semibold xl:text-sm text-xs">ravi patel</h1>
          </div>
          <div className="logout rounded-3xl">
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-1 px-2 rounded-full shadow-md text-xs cursor-pointer">
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div className="row2 flex justify-center ms:w-auto w-full items-center">
        <div className="wrapper w-full flex flex-col pt-5 h-[auto] rounded-t-2xl bg-opacity-20 ">
          <div className="profileinner flex lg:flex-row flex-col w-full justify-between">
            <div className="left bg-sidebar bg-opacity-70 lg:w-[25%] p-3 flex flex-col lg:h-[85%] h-[auto] rounded-2xl lg:gap-10 lg:sticky lg:top-0 mb-10 lg:mb-0">
              <div className="top flex flex-col justify-evenly items-center lg:gap-3 gap-2">
                <div className="one flex flex-col w-full justify-evenly items-center">
                  <div className="imgdiv relative">
                    <Image
                      alt="test1"
                      src="https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c"
                      className="rounded-full sm:w-[7vw] w-[20vw]"
                    />
                    <Image
                      alt="test1"
                      src="/badge3.png"
                      className="rounded-full lg:w-[50px] md:w-[50px] w-[10vw] absolute right-[-10px] bottom-[-10px]"
                    />
                  </div>
                  <div className="onetwo flex flex-col items-center gap-2 m-4">
                    <div className="username flex gap-1 font-bold lg:text-xl lg:text-md sm:text-xs text-[10px] text-white items-center">
                      <h1>mrsakhiya450</h1>
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
                      <h1>2 posts</h1>
                    </div>
                    <div className="followers"></div>
                    <h1 className=" text-[12px] xl:text-[14px]">
                      <button>0 followers</button>
                    </h1>
                    <div className="following  text-[12px] xl:text-[14px]">
                      <h1>
                        <button>0 following</button>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mid text-white flex flex-col gap-2 mt-4">
                <div className="title flex flex-col justify-between p-1">
                  <h1 className="text-xl text-white font-bold">Bio -</h1>
                  <div className="name font-bold">
                    <h1 className="capitalize text-sm mt-2 lg:text-lg">ravi patel</h1>
                  </div>
                </div>
                <ul className="list-disc ml-5">
                  <li className="font-light text-sm lg:text-lg">Content writer</li>
                  <li className="font-light text-sm lg:text-lg">Security analyst</li>
                  <li className="font-light text-sm lg:text-lg">Researcher</li>
                  <li className="font-light text-sm lg:text-lg">Entrepreneur</li>
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
                <div className="text-white bg-sidebar p-2 py-4 md:p-5 mx-auto  rounded-3xl items-start overflow-y-scroll scrollbar-hide w-[100%]">
                  <div className="text-xl font-['Montserrat'] font-medium leading-[1] mb-5 text-white w-full">
                    My Blogs
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 lg:col-span-6 mb-4">
                      <div className="bg-[#000] p-4 rounded-[15px]">
                        <div className="flex items-start">
                          <h3 className="flex-1 text-md md:text-lg font-['Poppins'] font-semibold leading-[1.3] text-[#ff00f2] w-full mb-2 md:mb-4 uppercase">
                            Engineering is waste of time
                          </h3>
                          <button className="py-1 px-2 rounded-lg bg-[#393939] text-white sm:text-xs text-[10px] ">
                            Edit Blog
                          </button>
                        </div>

                        <div className="flex w-full relative mb-1">
                          <div className="w-full md:flex-1 mt-0 md:mt-0">
                            <Image
                              alt="test1"
                              src="https://img.blogerbase.com/api/upload/KlBLAzhWLU"
                              className="w-full h-[138px] object-cover rounded-[23px] "
                            />
                          </div>
                          <div className="w-[20%] md:w-[30%]">
                            <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center mt-[0] h-full">
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaRegHeart className="min-h-0  relative w-4 shrink-0" />
                                <FaIcons.FaHeart className="min-h-0  relative w-4 shrink-0" />
                              </button>
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaRegBookmark className="min-h-0  relative w-4 shrink-0" />
                                <FaIcons.FaBookmark className="min-h-0  relative w-4 shrink-0" />
                              </button>
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaShareSquare className="min-h-0  relative w-4 shrink-0" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-center mt-3">
                          <p className="flex-1 mr-2 text-[10px]">
                            Why does psychotherapy work? Until relatively recently, many scientists studying methods of
                            improving mental and behavioral health have delayed answering that questi.....
                          </p>
                          <button className="bg-white inline-flex flex-col justify-center relative text-black-100 items-stretch py-2 px-2  rounded-[19.5px]">
                            <span className="whitespace-nowrap text-[10px] font-poppins leading-[1] text-black-100 relative">
                              Read More
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 lg:col-span-6 mb-4">
                      <div className="bg-[#000] p-4 rounded-[15px]">
                        <div className="flex items-start">
                          <h3 className="flex-1 text-md md:text-lg font-['Poppins'] font-semibold leading-[1.3] text-[#ff00f2] w-full mb-2 md:mb-4 uppercase">
                            Engineering is waste of time
                          </h3>
                          <button className="py-1 px-2 rounded-lg bg-[#393939] text-white sm:text-xs text-[10px] ">
                            Edit Blog
                          </button>
                        </div>

                        <div className="flex w-full relative mb-1">
                          <div className="w-full md:flex-1 mt-0 md:mt-0">
                            <Image
                              alt="test12"
                              src="https://img.blogerbase.com/api/upload/KlBLAzhWLU"
                              className="w-full h-[138px] object-cover rounded-[23px] "
                            />
                          </div>
                          <div className="w-[20%] md:w-[30%]">
                            <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center mt-[0] h-full">
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaRegHeart className="min-h-0  relative w-4 shrink-0" />
                                <FaIcons.FaHeart className="min-h-0  relative w-4 shrink-0" />
                              </button>
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaRegBookmark className="min-h-0  relative w-4 shrink-0" />
                                <FaIcons.FaBookmark className="min-h-0  relative w-4 shrink-0" />
                              </button>
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaShareSquare className="min-h-0  relative w-4 shrink-0" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-center mt-3">
                          <p className="flex-1 mr-2 text-[10px]">
                            Why does psychotherapy work? Until relatively recently, many scientists studying methods of
                            improving mental and behavioral health have delayed answering that questi.....
                          </p>
                          <button className="bg-white inline-flex flex-col justify-center relative text-black-100 items-stretch py-2 px-2  rounded-[19.5px]">
                            <span className="whitespace-nowrap text-[10px] font-poppins leading-[1] text-black-100 relative">
                              Read More
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6 mb-4">
                      <div className="bg-[#000] p-4 rounded-[15px]">
                        <div className="flex items-start">
                          <h3 className="flex-1 text-md md:text-lg font-['Poppins'] font-semibold leading-[1.3] text-[#ff00f2] w-full mb-2 md:mb-4 uppercase">
                            Engineering is waste of time
                          </h3>
                          <button className="py-1 px-2 rounded-lg bg-[#393939] text-white sm:text-xs text-[10px] ">
                            Edit Blog
                          </button>
                        </div>

                        <div className="flex w-full relative mb-1">
                          <div className="w-full md:flex-1 mt-0 md:mt-0">
                            <Image
                              alt="test4"
                              src="https://img.blogerbase.com/api/upload/KlBLAzhWLU"
                              className="w-full h-[138px] object-cover rounded-[23px] "
                            />
                          </div>
                          <div className="w-[20%] md:w-[30%]">
                            <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center mt-[0] h-full">
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaRegHeart className="min-h-0  relative w-4 shrink-0" />
                                <FaIcons.FaHeart className="min-h-0  relative w-4 shrink-0" />
                              </button>
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaRegBookmark className="min-h-0  relative w-4 shrink-0" />
                                <FaIcons.FaBookmark className="min-h-0  relative w-4 shrink-0" />
                              </button>
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaShareSquare className="min-h-0  relative w-4 shrink-0" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-center mt-3">
                          <p className="flex-1 mr-2 text-[10px]">
                            Why does psychotherapy work? Until relatively recently, many scientists studying methods of
                            improving mental and behavioral health have delayed answering that questi.....
                          </p>
                          <button className="bg-white inline-flex flex-col justify-center relative text-black-100 items-stretch py-2 px-2  rounded-[19.5px]">
                            <span className="whitespace-nowrap text-[10px] font-poppins leading-[1] text-black-100 relative">
                              Read More
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6 mb-4">
                      <div className="bg-[#000] p-4 rounded-[15px]">
                        <div className="flex items-start">
                          <h3 className="flex-1 text-md md:text-lg font-['Poppins'] font-semibold leading-[1.3] text-[#ff00f2] w-full mb-2 md:mb-4 uppercase">
                            Engineering is waste of time
                          </h3>
                          <button className="py-1 px-2 rounded-lg bg-[#393939] text-white sm:text-xs text-[10px] ">
                            Edit Blog
                          </button>
                        </div>

                        <div className="flex w-full relative mb-1">
                          <div className="w-full md:flex-1 mt-0 md:mt-0">
                            <Image
                              alt="test4"
                              src="https://img.blogerbase.com/api/upload/KlBLAzhWLU"
                              className="w-full h-[138px] object-cover rounded-[23px] "
                            />
                          </div>
                          <div className="w-[20%] md:w-[30%]">
                            <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center mt-[0] h-full">
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaRegHeart className="min-h-0  relative w-4 shrink-0" />
                                <FaIcons.FaHeart className="min-h-0  relative w-4 shrink-0" />
                              </button>
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaRegBookmark className="min-h-0  relative w-4 shrink-0" />
                                <FaIcons.FaBookmark className="min-h-0  relative w-4 shrink-0" />
                              </button>
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaShareSquare className="min-h-0  relative w-4 shrink-0" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-center mt-3">
                          <p className="flex-1 mr-2 text-[10px]">
                            Why does psychotherapy work? Until relatively recently, many scientists studying methods of
                            improving mental and behavioral health have delayed answering that questi.....
                          </p>
                          <button className="bg-white inline-flex flex-col justify-center relative text-black-100 items-stretch py-2 px-2  rounded-[19.5px]">
                            <span className="whitespace-nowrap text-[10px] font-poppins leading-[1] text-black-100 relative">
                              Read More
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6 mb-4">
                      <div className="bg-[#000] p-4 rounded-[15px]">
                        <div className="flex items-start">
                          <h3 className="flex-1 text-md md:text-lg font-['Poppins'] font-semibold leading-[1.3] text-[#ff00f2] w-full mb-2 md:mb-4 uppercase">
                            Engineering is waste of time
                          </h3>
                          <button className="py-1 px-2 rounded-lg bg-[#393939] text-white sm:text-xs text-[10px] ">
                            Edit Blog
                          </button>
                        </div>

                        <div className="flex w-full relative mb-1">
                          <div className="w-full md:flex-1 mt-0 md:mt-0">
                            <Image
                              alt="test4"
                              src="https://img.blogerbase.com/api/upload/KlBLAzhWLU"
                              className="w-full h-[138px] object-cover rounded-[23px] "
                            />
                          </div>
                          <div className="w-[20%] md:w-[30%]">
                            <div className="flex flex-wrap flex-row justify-end gap-3 relative items-center mt-[0] h-full">
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaRegHeart className="min-h-0  relative w-4 shrink-0" />
                                <FaIcons.FaHeart className="min-h-0  relative w-4 shrink-0" />
                              </button>
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaRegBookmark className="min-h-0  relative w-4 shrink-0" />
                                <FaIcons.FaBookmark className="min-h-0  relative w-4 shrink-0" />
                              </button>
                              <button className="min-w-0 mr-px">
                                <FaIcons.FaShareSquare className="min-h-0  relative w-4 shrink-0" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-center mt-3">
                          <p className="flex-1 mr-2 text-[10px]">
                            Why does psychotherapy work? Until relatively recently, many scientists studying methods of
                            improving mental and behavioral health have delayed answering that questi.....
                          </p>
                          <button className="bg-white inline-flex flex-col justify-center relative text-black-100 items-stretch py-2 px-2  rounded-[19.5px]">
                            <span className="whitespace-nowrap text-[10px] font-poppins leading-[1] text-black-100 relative">
                              Read More
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
