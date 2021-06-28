import create from 'zustand'
import { persist } from 'zustand/middleware'

const useAuth = create(
  persist(
    (set, get) => ({
      userInfo: {},
      token: '',
      setToken: (token: string) => set(() => ({ token: token })),
    }),
    {
      name: 'auth-storage',
      getStorage: () => sessionStorage,
    }
  )
)

export default useAuth
