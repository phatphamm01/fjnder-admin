import Cookies from 'js-cookie';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { apiCaller } from '../service/index';
import { getUser, setUser } from '~/store/user';
import { SignInAsAdminArgs } from '~/api-graphql';

interface UserStore {
  accessToken?: string;
  refreshToken?: string;
}

interface UserAction {
  signIn: (args: SignInAsAdminArgs) => Promise<boolean>;
  logout: () => void;
  setSession: (data: {
    accessToken: string;
    refreshToken: string;
  }) => Promise<boolean>;
}

export const useAuthStore = create<UserStore & UserAction>()(
  persist(
    (set, get) => ({
      setSession: async ({ accessToken, refreshToken }) => {
        set({ accessToken, refreshToken });

        await getUser();
        return true;
      },
      signIn: async args => {
        const { accessToken, refreshToken } = await apiCaller
          .signInAsAdmin(['accessToken', 'refreshToken'])
          .$args(args)
          .$fetch();

        return get().setSession({ accessToken, refreshToken });
      },
      logout: () => {
        set({
          accessToken: undefined,
          refreshToken: undefined,
        });
        setUser(undefined);

        location.reload();
      },
    }),
    {
      name: 'user',
      getStorage: () => ({
        getItem: name => Cookies.get(name) as any,
        removeItem: name => Cookies.remove(name) as any,
        setItem: (name, value) => Cookies.set(name, value) as any,
      }),
      partialize: s => ({
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
      }),
    },
  ),
);

export const { logout, setSession, signIn } = useAuthStore.getState();
