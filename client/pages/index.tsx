import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import useAuth from '../store/useAuth'
import { Box } from '@chakra-ui/react'
import { TodayTime } from '../components/TodayTime'

const IndexPage: NextPage = () => {
  const router = useRouter()
  let token = useAuth((state) => state.token)
  let userInfo = useAuth((state: any) => state.userInfo)

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token])

  return (
    <Box>
      <TodayTime username={userInfo.username} />
    </Box>
  )
}

export default IndexPage
