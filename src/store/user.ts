import create from "zustand";
import { persist } from "zustand/middleware";
import { User } from "~/api-graphql";
import { getUserFragment } from "~/service/user";

import { apiCaller } from "~/service";

interface UserStore {
  user?: User;
}

interface UserAction {
  setUser: (user?: User) => void;
  getUser: () => Promise<boolean>;
}

export const useUserStore = create<UserStore & UserAction>()(
  persist(
    (set) => ({
      getUser: async () => {
        const user = await apiCaller.getCurrentUser(getUserFragment).$fetch();

        set({ user });
        return true;
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: "user",
      partialize: (s) => ({
        user: s.user,
      }),
    }
  )
);

export const { getUser, setUser } = useUserStore.getState();
