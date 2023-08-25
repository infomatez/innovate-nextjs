import { useState } from 'react';
import LoginSignUp from '@/src/components/login/LoginSignUp';
import { LoginEnums } from '@/src/utils/enums';
import LoginSignUpForm from '@/src/components/login/LoginSignUpForm';
export default function LoginPage() {
  const [userAction, setUserAction] = useState(LoginEnums.INDEX)
  return (
    <div className="flex justify-center h-screen w-full login-gradient overflow-y-auto">
      {
         userAction===LoginEnums.INDEX?<LoginSignUp setUserAction={setUserAction} />:<LoginSignUpForm userAction={userAction} setUserAction={setUserAction}/>
      }
    </div>
  );
}
