import React, { useState, useEffect } from 'react'
import { calculateTodayTimeInterval } from '../utils/time'
import { Box, Text, Stack, VStack } from '@chakra-ui/react'

interface IProps {
  username: string
}

interface ITime {
  timeInterval: string
  hour: number
  min: number
}

export const TodayTime = ({ username }: IProps) => {
  const [time, setTime] = useState<Partial<ITime>>(calculateTodayTimeInterval())

  useEffect(() => {
    let timer = setTimeout(() => {
      setTime(calculateTodayTimeInterval())
    }, 1000 * 60)
    return () => clearTimeout(timer)
  })

  // More UI imporvement needed
  return (
    <Stack spacing="2" my="2">
      <VStack>
        <Box>
          <Text fontSize="3xl" fontWeight="semibold">
            {time.hour}:{time.min}
          </Text>
        </Box>
        <Box>
          <Text color="gray.600">
            Good {time.timeInterval}, {username}!
          </Text>
        </Box>
      </VStack>
    </Stack>
  )
}
