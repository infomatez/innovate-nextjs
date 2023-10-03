import Cookies from 'js-cookie';
import BottomBar from './Bottombar';
import Sidebar from './Sidebar';
import { useAuth } from '@/src/context/authContext';
import { useEffect, useState } from 'react';

type MainLayoutProps = {
  children?: React.ReactNode;
};
export default function UserPanelLayout({ children }: MainLayoutProps) {
  const accessTokenFromCookie = Cookies.get('accessToken');
  const { accessToken } = useAuth();

  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    const hasAccessToken: any = accessTokenFromCookie || accessToken;
    setShowSidebar(hasAccessToken);
  }, [accessTokenFromCookie, accessToken]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row">
        {showSidebar && <Sidebar />}
        <div className="flex-1 px-4 lg:px-10 pb-10">{children}</div>
        <div className="h-[8vh] order-3 z-50 bottom-0 sm:hidden fixed bottom-0 left-0 w-full">
          <BottomBar />
        </div>
      </div>
    </div>
  );
}
