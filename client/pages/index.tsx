import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import useAuth from '../store/useAuth'
import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import { TodayTime } from '../components/TodayTime'
import { Todos } from '../components/Todos'
import { Timer } from '../components/Timer'

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
      <SimpleGrid columns={2} spacing={10}>
        <Todos />
        <Timer />
      </SimpleGrid>
    </Box>
  )
}

export default IndexPage
