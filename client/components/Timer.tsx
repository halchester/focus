import { Stack, Text, Box, Input, HStack, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'
import { calculateBreakTime } from '../utils/time'
import { Clock } from './Clock'

export const Timer = () => {
  const [studyTime, setStudyTime] = React.useState(50)
  const [breakTime, setBreakTime] = React.useState(calculateBreakTime(studyTime))

  React.useEffect(() => {
    setBreakTime(calculateBreakTime(studyTime))
  }, [studyTime])

  return (
    <Box m="2">
      <Text fontSize="lg" align="center" mb="2" fontWeight="semibold">
        Focus Timer
      </Text>
      <Stack spacing="4">
        <HStack spacing="6">
          <Text fontWeight="semibold">How long do you want to study?</Text>
          <InputGroup>
            <InputLeftAddon children="mins" />
            <Input
              width="80"
              value={studyTime}
              onChange={(e: any) => setStudyTime(e.target.value)}
              isInvalid={studyTime > 180}
            />
          </InputGroup>
        </HStack>
        <HStack spacing="6">
          <Text fontWeight="semibold">Breaktime : {breakTime} minutes</Text>
        </HStack>
        <Clock studyTime={studyTime} breakTime={breakTime} />
      </Stack>
    </Box>
  )
}
