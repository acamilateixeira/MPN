import { createContext, useEffect, useState } from 'react';

import { User } from '../models/user';
import AuthServices, { SignInCredentials, SignInResponse } from '../services/auth';

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  type: string | null;
  signIn: (
    credenciais: SignInCredentials
  ) => Promise<Omit<SignInResponse, 'tkey' | 'username' | 'codEmpresa' | 'type'>>;
  signOut: () => void;
}

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthContextProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<User | null>(null);
  const [type, setType] = useState<string | null>(null);

  async function signIn(
    credentials: SignInCredentials
  ): Promise<Omit<SignInResponse, 'tkey' | 'username' | 'codEmpresa' | 'type'>> {
    const { username, success, message, type } = await AuthServices.signIn(credentials);

    setUsername(username);
    setType(type);

    return { success, message };
  }

  async function signOut() {
    setIsLoading(true);
    try {
      await AuthServices.signOut();
    } catch (error) {
      console.error(error);
    } finally {
      setUsername(null);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = AuthServices.getUsername();
      const storageType = AuthServices.getType();

      await new Promise(resolve => setTimeout(resolve, 500));

      setUsername(storageUser);
      setType(storageType);

      setIsLoading(false);
    }
    loadStorageData();
  }, [setType]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!username && username !== undefined,
        isLoading,
        user: username,
        signIn,
        signOut,
        type,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
