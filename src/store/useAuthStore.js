import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      // call this after your login/register API succeeds
      login: (token, user) => set({ token, user }),

      logout: () => set({ token: null, user: null }),

      isAuthenticated: () => Boolean(get().token),
    }),
    { name: 'auth-storage' }
  )
)