import { createContext, useEffect, useState } from 'react';

import AuthServices, { SignInCredentials, SignInResponse } from '../services/auth';

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (
    credenciais: SignInCredentials
  ) => Promise<Omit<SignInResponse, 'tkey' | 'username' | 'codEmpresa'>>;
  signOut: () => void;
}

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthContextProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  async function signIn(
    credentials: SignInCredentials
  ): Promise<Omit<SignInResponse, 'tkey' | 'username' | 'codEmpresa'>> {
    const { username, success, message } = await AuthServices.signIn(credentials);

    setUsername(username);

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

      await new Promise(resolve => setTimeout(resolve, 500));

      setUsername(storageUser);

      setIsLoading(false);
    }
    loadStorageData();
  }, [setUsername]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!username && username !== '', isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
