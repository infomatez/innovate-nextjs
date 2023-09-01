import Image from 'next/image';
import React, { useState } from 'react';

const Modal = ({ userProfile, onClose }) => {
    const [activeTab, setActiveTab] = useState('tab1'); // Initialize the active tab state

    const closeModal = () => {
        // Call the onClose function to close the modal
        onClose();
    };

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
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div><div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                        </div>
                    ) : (
                        <div className='overflow-auto h-[330px] flex flex-col'>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Test</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div><div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                            <div className='follower-list flex justify-between items-center mb-3'>
                                <div className='flex items-center'>
                                    <Image src='https://lh3.googleusercontent.com/a/AAcHTtexA2-I0IIQAIx-4IXhoo-oHuU-M05zwD4mSYvDE4u5Dz0=s96-c' height="48" width="48" className='rounded-[50%] mr-3' />
                                    <div className='follow-info'>
                                        <h5 className=" text-white text-sm font-semibold leading-[1.5] tracking-wide">Username</h5>
                                        <p className=" text-white text-[10.80px] font-normal leading-[1.3] tracking-wide">profile name</p>
                                    </div>
                                </div>
                                <button className="border-solid border-white bg-white flex flex-col w-16 shrink-0 h-4 items-center py-1 border rounded"><div className="text-xs font-['Poppins'] font-medium tracking-[0.59] leading-[7.58px] text-[#ad00ff] w-3/5">Follow</div></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;