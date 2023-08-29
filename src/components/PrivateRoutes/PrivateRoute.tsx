import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAuthenticated(accessToken !== null);
  }, [accessToken]);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null; 
  }

  return <>{children}</>;
};



export default PrivateRoute;


