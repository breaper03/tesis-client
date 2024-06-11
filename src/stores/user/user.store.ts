// store/authStore.ts
import { authUser } from '@/api/auth/auth.api';
import create from 'zustand';
import { persist } from 'zustand/middleware';


interface AuthState {
  token: string | null;
  user: any | null;
  error: string | null;
  login: (document: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      error: null,
      login: async (document, password) => {
        try {
          const response = await authUser(password, document);
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          set({ token, user, error: null });
        } catch (error: any) {
          set({ error: error.message || 'Ocurrio un error al iniciar sesion.' });
        }
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, error: null });
      },
    }),
    {
      name: 'auth-storage', 
    }
  )
);
