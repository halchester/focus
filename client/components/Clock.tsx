import { Box, Text, Center, Stack, HStack, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface IClockProps {
  studyTime: number
  breakTime: number
}

export const Clock = ({ studyTime, breakTime }: IClockProps) => {
  const [start, setStart] = useState(false)
  return (
    <>
      <Center>
        <Stack>
          <HStack>
            <CountdownCircleTimer
              isPlaying={start}
              duration={studyTime * 60}
              colors={[
                ['#004777', 0.33],
                ['#F7B801', 0.33],
                ['#A30000', 0.33],
              ]}
            >
              {({ remainingTime }) => {
                return `${remainingTime} secs`
              }}
            </CountdownCircleTimer>
            <CountdownCircleTimer
              isPlaying={start}
              duration={studyTime * 60}
              colors={[
                ['#004777', 0.33],
                ['#F7B801', 0.33],
                ['#A30000', 0.33],
              ]}
            >
              {({ remainingTime }) => {
                return `${remainingTime} secs`
              }}
            </CountdownCircleTimer>
          </HStack>
        </Stack>
      </Center>
      <Center>
        <Stack>
          <HStack>
            <Button onClick={() => setStart(!start)}>{start ? 'Stop' : 'Start'}</Button>
          </HStack>
        </Stack>
      </Center>
    </>
  )
}
