import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Tokens, User } from '../../../types/response/auth/login';

type UserStoreType = {
  user?: User;
  tokens?: Tokens;
  setUser: (user: User) => void;
  setTokens: (tokens: Tokens) => void;
};

export const userStore = create<UserStoreType>()(
  persist(
    immer((set) => ({
      setUser: (user) => set((state) => void (state.user = user)),
      setTokens: (tokens) => set((state) => void (state.tokens = tokens)),
    })),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
