import create from 'zustand'
import { persist } from 'zustand/middleware'
import axios from '../utils/api'

const useAuth = create(
  persist(
    (set, get) => ({
      userInfo: {},
      token: '',
      errorMessage: '',

      setToken: (token: string) => set(() => ({ token: token })),

      loginCurrentUser: async (payload: { username: string; password: string }) => {
        try {
          const response = await axios.post('/api/login', payload)
          const {
            data: { data },
          } = response
          set({
            userInfo: {
              username: data.username,
              uniqueId: data.uniqueId,
            },
            token: data.token,
            errorMessage: '',
          })
        } catch ({
          response: {
            data: { error },
          },
        }) {
          set({
            errorMessage: error,
            userInfo: {},
          })
        }
      },

      logoutCurrentUser: () => {
        set({
          userInfo: {},
          token: '',
        })
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => sessionStorage,
    }
  )
)

export default useAuth
