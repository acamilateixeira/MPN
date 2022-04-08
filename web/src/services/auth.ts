import Cookie from 'js-cookie';

import api from '../services/api';

export interface SignInCredentials {
  username: string;
  password: string;
  codEmpresa: number | undefined;
}

export interface SignInResponse {
  username: string | null;
  codEmpresa: number | null;
  token: string | null;
  success: boolean;
  message: string;
}

class AuthServices {
  getCodEmpresa(): number | null {
    const codEmpresa = Cookie.get('@MPN:CodEmpresa');

    if (codEmpresa) {
      return JSON.parse(codEmpresa);
    }

    return null;
  }

  getToken(): string | undefined {
    return Cookie.get('@MPN:Token');
  }

  getUsername(): string | null {
    const username = Cookie.get('@MPN:username');

    if (username) {
      return JSON.parse(username);
    }

    return null;
  }

  async signIn(credenciais: SignInCredentials): Promise<SignInResponse> {
    try {
      const response = await api.post('/auth/admin', credenciais);

      const { username, codEmpresa, token } = response.data;

      Cookie.set('@MPN:username', JSON.stringify(username));
      Cookie.set('@MPN:CodEmpresa', JSON.stringify(codEmpresa));
      Cookie.set('@MPN:Token', token);

      return {
        username,
        codEmpresa,
        token,
        success: true,
        message: 'Aguarde, você será redirecionado...',
      };
    } catch (error: any) {
      return {
        username: null,
        codEmpresa: null,
        token: null,
        success: false,
        message: error.response ? error.response.data.message : 'Erro de comunicação',
      };
    }
  }

  async signOut() {
    try {
      await api.delete('/auth');

      Cookie.remove('@MPN:username');
      Cookie.remove('@MPN:CodEmpresa');
      Cookie.remove('@MPN:Token');
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthServices();
