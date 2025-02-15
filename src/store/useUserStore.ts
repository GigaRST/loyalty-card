import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    points: number;
  } | null;
  setUser: (user: UserState["user"]) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
