import create from 'zustand'
import { combine } from 'zustand/middleware'
import axios from '../utils/api'

const useAuth = create(
  combine(
    {
      userInfo: {},
      token: '',
      errorMessage: '',
    },
    (set) => ({
      setToken: (token: string) => set(() => ({ token: token })),

      registerUser: async (payload: { username: string; password: string; fullname: string }) => {
        try {
          await axios.post('/api/register', payload).then((response) => console.log(response))
        } catch ({
          response: {
            data: { error },
          },
        }) {
          console.log(error)
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
        })
      },
    })
  )
)

export default useAuth
