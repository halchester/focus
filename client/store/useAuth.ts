import create from 'zustand'
import { combine } from 'zustand/middleware'
import axios from '../utils/api'

const useAuth = create(
  combine(
    {
      userInfo: {},
      token: '',
      errorMessage: '',
      registerStatus: '',
    },
    (set) => ({
      setToken: (token: string) => set(() => ({ token: token })),
      clearRegisterStatus: () => set({ registerStatus: '' }),

      registerUser: async (payload: { username: string; password: string; fullname: string }) => {
        try {
          const response = await axios.post('/api/register', payload)
          if (response) {
            set({
              registerStatus: 'true',
            })
          }
        } catch ({
          response: {
            data: { error },
          },
        }) {
          set({
            registerStatus: 'false',
            errorMessage: error,
          })
        }
      },

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
          errorMessage: '',
          registerStatus: '',
        })
      },
    })
  )
)

export default useAuth
