    import React, { createContext, useContext, useState, ReactNode } from 'react';

    type UserContextType = {
    contextUserId: string | null;
    username: string | null;
    setUser: (contextUserId: string, username: string) => void;
    };

    const UserContext = createContext<UserContextType | undefined>(undefined);

    type UserProviderProps = {
    children: ReactNode;
    };

    export function UserProvider({ children }: UserProviderProps) {
    const [contextUserId, setContextUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    const setUser = (id: string, name: string) => {
        setContextUserId(id);
        setUsername(name);
    };

    return (
        <UserContext.Provider value={{ contextUserId, username, setUser }}>
        {children}
        </UserContext.Provider>
    );
    }

    export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    
    return context;
    }
