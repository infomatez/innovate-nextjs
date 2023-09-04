import EyeIcon from '@/src/components/icons/solid/EyeIcon';
import { LoginEnums } from '@/src/utils/enums';
import Image from 'next/image';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import googleIcon from '@/public/site-icons/google.png';
import recaptcha from '@/public/recaptcha.png';
import { login, registerUser } from '../../services/auth';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';

interface ILoginSignUpFormProps {
    userAction: LoginEnums;
    setUserAction: Dispatch<SetStateAction<LoginEnums>>;
}

interface ILoginSignUpForm { 
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface CustomError {
  status_code: number;
  message: string;
}

const LoginSignUpForm: FC<ILoginSignUpFormProps> = ({ userAction, setUserAction }) => {
    const [togglePasswordField, setTogglePasswordField] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<ILoginSignUpForm>();
    const router = useRouter();
    const isPasswordValid = (password: string) => {
        return /^(?=.*[A-Z])(?=.*\d).{7,}$/.test(password);
      };
     
   
      
      const handleFormSubmit: SubmitHandler<ILoginSignUpForm> = async (data: ILoginSignUpForm) => {
        setIsLoading(true);
      
        if (userAction === LoginEnums.LOGIN) {
          try {
            const userData = await login(data.username, data.email, data.password);
            if (userData && userData.token) {
              toast.success('Login Successful');
              Cookies.set('accessToken', userData.token, { expires: 7 });
              router.push('/main/profile');
            } else {
              if (userData && userData.message) {
                toast.error(userData.message);
              } else {
                toast.error('Login failed');
              }
            }
          } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
              const errorMessage = error.response.data.message;
              toast.error(errorMessage);
            } else {
              toast.error('Login error');
            }
          } finally {
            setIsLoading(false);
          }
        } else if (userAction === LoginEnums.SIGN_UP) {
          try {
            const userData = await registerUser(data.username, data.email, data.password);
            if (userData && userData.token) {
              toast.success('User Registered Successfully');
              Cookies.set('accessToken', userData.token, { expires: 7 });
              router.push('/main/profile');
            } else {
              if (userData && userData.message) {
                toast.error(userData.message);
              } else {
                toast.error('Registration failed');
              }
            }
          } catch (error:any) {
            if (error.response && error.response.data && error.response.data.message) {
              const errorMessage = error.response.data.message;
              toast.error(errorMessage);
            } else {
              toast.error('Registration error');
            }
          } finally {
            setIsLoading(false);
          }
        }
      };
      
      
      
    useEffect(() => {
        reset({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    }, [userAction]);
    return (
      <>
       {isLoading && <Loader />}
        <div className='w-full h-[100vh] flex items-center'>
          <div className="container mx-auto px-4 py-10 h-full">
            <div className="flex flex-wrap -mx-2 justify-center">
              <div className="w-[85%] md:w-2/5 xl:w-1/4 px-2 flex flex-col  items-center">
                <div className="mb-10">
                  <p className="text-white text-[24px] md:text-[35px] font-normal font-poppins text-center">{userAction === LoginEnums.LOGIN ? 'Welcome,' : 'Create Account'}</p>
                  <p className="text-[#B8B8B8] text-[24px] md:text-[35px] font-extralight font-poppins text-center">{userAction === LoginEnums.LOGIN ? 'Glad to see you!' : 'to get started now!'}</p>
                </div>
                <form className='w-full' onSubmit={handleSubmit(handleFormSubmit)}>
                  <div className="flex flex-col gap-4 items-center">
                    <div className='relative w-full'>
                      <input
                        className='rounded-lg w-full py-3 text-sm md:text-lg md:py-4 shadow-login-input text-[#fff] font-light font-poppins outline-none bg-[rgba(255,255,255,0.06)] pl-3'
                        placeholder='Username'
                        {...register("username", { required: true })}
                      />
                      {errors.username && <span className="text-red-600 text-start w-full text-xs md:text-sm mt-1">This field is required</span>}
                    </div>
                    <div className='relative w-full'>
                      <input
                        className='rounded-lg w-full py-3 text-sm md:text-lg md:py-4 shadow-login-input text-[#fff] font-light font-poppins outline-none bg-[rgba(255,255,255,0.06)] pl-3'
                        placeholder='Email Address'
                        {...register("email", {
                          required: true,
                          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        })}
                      />
                      {errors.email?.type === 'required' && <span className="text-red-600 text-start w-full text-xs md:text-sm mt-1">This field is required</span>}
                      {errors.email?.type === 'pattern' && <span className="text-red-600 text-start w-full text-xs md:text-sm mt-1">Invalid email format</span>}
                    </div>
                    <div className='relative flex flex-col w-full'>
                      <input
                        type={togglePasswordField ? 'text' : 'password'}
                        className='rounded-lg w-full py-3 text-sm md:text-lg md:py-4 shadow-login-input text-[#fff] font-light font-poppins outline-none bg-[rgba(255,255,255,0.06)] pl-3'
                        placeholder='Password'
                        {...register("password", {
                          required: true,
                          validate: {
                            length: value => isPasswordValid(value) || 'Password must contain at least one capital letter, one special character, and be at least 7 characters long'
                          }
                        })}
                      />
                      {errors.password?.type === 'required' && <span className="text-red-600 text-start w-full text-xs md:text-sm mt-1">This field is required</span>}
                      {errors.password?.type === 'length' && <span className="text-red-600 text-start w-full text-xs md:text-sm mt-1">{errors.password.message}</span>}
                      <EyeIcon className='absolute top-4 right-4 cursor-pointer' onClick={() => setTogglePasswordField(state => !state)} />
                      {
                        userAction === LoginEnums.LOGIN && <p className='text-grey-300 ml-2 font-poppins font-light text-lg self-end mt-2 cursor-pointer'>Forgot Password?</p>
                      }
                    </div>
                    {userAction === LoginEnums.SIGN_UP && (
                      <div className='relative w-full'>
                        <input
                          type='password'
                          className='rounded-lg w-full py-3 text-sm md:text-lg md:py-4 shadow-login-input text-[#fff] font-light font-poppins outline-none bg-[rgba(255,255,255,0.06)] pl-3'
                          placeholder='Confirm Password'
                          {...register("confirmPassword", {
                            required: true,
                            validate: value => value === watch('password') || 'Passwords do not match'
                          })}
                        />
                        {errors.confirmPassword?.type === 'required' && <span className="text-red-600 text-start w-full text-xs md:text-sm mt-1">This field is required</span>}
                        {errors.confirmPassword?.type === 'validate' && <span className="text-red-600 text-start w-full text-xs md:text-sm mt-1">{errors.confirmPassword.message}</span>}
                      </div>
                    )}
                    <div className='flex items-center p-2 border-[0.6px] border-white rounded-sm w-fit self-start'>
                      <input type='checkbox' className='' id='recaptcha' />
                      <label htmlFor='recaptcha' className='ml-2 font-poppins text-white font-medium text-xs '>I’am not a robot</label>
                      <Image src={recaptcha} className='ml-3' alt='recaptcha' />
                    </div>
                    <button
                      type='submit'
                      className='rounded-[28px] mt-4 bg-pink-200 text-black-0 font-normal text-1xl lg:text-2xl font-m-plus py-3 px-[20px] w-full'
                    >{userAction === LoginEnums.SIGN_UP ? 'Sign up' : 'Login'}</button>
                  </div>
                </form >
      
                <div className='flex gap-4 items-center mt-5 w-full'>
                  <div className='w-full h-[0.5px] bg-white'></div>
                  <p className='font-light font-poppins text-grey-300 text-sm  whitespace-nowrap'>Or Login With</p>
                  <div className='w-full h-[0.5px] bg-white'></div>
                </div>
                <button className='px-11 py-1 bg-white rounded-[6.6px] w-fit mx-auto mt-5 relative'>
                  <Image src={googleIcon} alt='google icon' />
                </button>
                <p className='font-light font-poppins text-grey-300 text-sm md:text-lg mt-5 text-center'>Don’t have any account?<span className='ml-1 cursor-pointer font-medium font-poppins text-white text-sm md:text-lg' onClick={() => setUserAction(userAction === LoginEnums.LOGIN ? LoginEnums.SIGN_UP : LoginEnums.LOGIN)}>{userAction === LoginEnums.LOGIN ? 'Sign Up Now' : 'Login Now'}</span></p>
              </div>
            </div>
          </div>
        </div>
        </>
      );
      
}

export default LoginSignUpForm