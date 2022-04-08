import { createContext, useEffect, useState } from 'react';

import AuthServices, { SignInCredentials, SignInResponse } from '../services/auth';

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (
    credenciais: SignInCredentials
  ) => Promise<Omit<SignInResponse, 'token' | 'username' | 'codEmpresa'>>;
  signOut: () => void;
}

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthContextProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  console.log('username', username);

  async function signIn(
    credentials: SignInCredentials
  ): Promise<Omit<SignInResponse, 'token' | 'username' | 'codEmpresa'>> {
    const { username, codEmpresa, success, message } = await AuthServices.signIn(credentials);

    console.log(success, message);
    console.log(username, codEmpresa);
    setIsAuthenticated(true);
    setUsername(username);

    return { success, message };
  }

  async function signOut() {
    setIsLoading(true);
    try {
      await AuthServices.signOut();

      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    } finally {
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
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
