import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextData {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  removeAccessToken: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  useEffect(() => {
    const storedAccessToken = Cookies.get('accessToken');

    if (storedAccessToken) {
      setAccessTokenState(storedAccessToken);
    }
  }, []);

  const setAccessToken = (token: string | null) => {
    if (token) {
      Cookies.set('accessToken', token);
    } else {
      Cookies.remove('accessToken');
    }
    setAccessTokenState(token);
  };

  const removeAccessToken = () => {
    Cookies.remove('accessToken');
    setAccessTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, removeAccessToken }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
