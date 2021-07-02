import { Stack, Text, Box, Center } from '@chakra-ui/react'
import React from 'react'
import { CustomRadios } from './CustomRadios'
import { usePomodoro } from '../store/usePomodoro'
import { TimeSettings } from './TimeSettings'

export const Timer = () => {
  const selectedTypeRadio = usePomodoro((state: any) => state.selectedTypeRadio)

  return (
    <Box m="2">
      <Text fontSize="lg" align="center" mb="2" fontWeight="semibold">
        Pomodoro
      </Text>
      <Center>
        <CustomRadios />
      </Center>
      <TimeSettings />
    </Box>
  )
}
