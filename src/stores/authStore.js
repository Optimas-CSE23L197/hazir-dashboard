import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      tenant: null,
      isAuthenticated: false,

      login: (user, token, tenant) =>
        set({ user, token, tenant, isAuthenticated: true }),

      logout: () =>
        set({ user: null, token: null, tenant: null, isAuthenticated: false }),

      updateUser: (user) => set({ user }),
    }),
    {
      name: "hazir-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        tenant: state.tenant,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
