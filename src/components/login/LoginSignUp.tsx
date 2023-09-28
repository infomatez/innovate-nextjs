import React, { Dispatch, FC, SetStateAction } from 'react'
import { motion } from 'framer-motion';
import { LoginEnums } from '@/src/utils/enums';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '@/src/routes/path';
import { GetServerSideProps } from 'next';
import { withAuthServerSideProps } from '../PrivateRoutes/withAuthServerSideProps';

interface ILoginSignUpProps {
    setUserAction: Dispatch<SetStateAction<LoginEnums>>
}
const LoginSignUp: FC<ILoginSignUpProps> = ({ setUserAction }) => {
    const router = useRouter()
    return (
        <div className='w-full h-[100vh] flex items-center overflow-y-auto'>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-2 justify-center">
                    <div className="w-full md:w-1/3 px-2 flex flex-col  items-center">
                        <Image
                            src="/byteBlogger1.png"
                            alt="logo image"
                            width={658}
                            height={164}
                            className="w-full h-auto mb-14"
                        />
                        <motion.button
                            className="rounded-[36px] border-[3px] border-white text-pink-200 font-normal text-[30px] font-poppins px-8 md:px-12 py-3 w-full outline-none transition-all duration-500 ease-in-out"
                            onClick={() => setUserAction(LoginEnums.LOGIN)}
                            whileHover={{
                                scale: 1.2,
                                backgroundColor: 'white',
                            }}
                            whileTap={{ scale: 0.5 }}
                        >
                            Login
                        </motion.button>
                        <motion.button
                            className="rounded-[36px] border-[3px] border-white text-white font-normal text-[30px] font-poppins px-8 md:px-12 py-3 w-full mt-6 outline-none transition-all duration-500 ease-in-out"
                            onClick={() => setUserAction(LoginEnums.SIGN_UP)}
                            whileHover={{
                                scale: 1.2,
                                backgroundColor: '#bd30FF',
                                borderColor: '#bd30FF'
                            }}
                            whileTap={{ scale: 0.5 }}
                        >
                            SignUp
                        </motion.button>
                        <button className="text-white text-[24px] font-light font-poppins mt-14 hover:opacity-70 transition-all duration-500 ease-in-out" onClick={()=>router.push(PATH_DASHBOARD.dashboard)}>
                            Continue as a guest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LoginSignUp

export const getServerSideProps:GetServerSideProps = async (context) => {
    const { accessToken } = context.req.cookies;
    if (accessToken) {
      return {
        redirect: {
          destination: '/main/profile',
          permanent: false,
        },
      };
    }
  
    return {
      props: {},
    };
  };
