import { useState } from 'react';
import LoginSignUp from '@/src/components/login/LoginSignUp';
import { LoginEnums } from '@/src/utils/enums';
import LoginSignUpForm from '@/src/components/login/LoginSignUpForm';
import { GetServerSideProps } from 'next';
import { withAuthServerSideProps } from '@/src/components/PrivateRoutes/withAuthServerSideProps';
export default function LoginPage() {
  const [userAction, setUserAction] = useState(LoginEnums.INDEX);
  return (
    <div className="flex justify-center h-screen w-full login-gradient overflow-y-auto">
      {userAction === LoginEnums.INDEX ? (
        <LoginSignUp setUserAction={setUserAction} />
      ) : (
        <LoginSignUpForm userAction={userAction} setUserAction={setUserAction} />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
