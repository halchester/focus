import { Center } from '@chakra-ui/react'
import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface IClockProps {
  timer: number
  animate: boolean
  children: React.ReactNode
}

export const Clock = ({ timer, animate, children }: IClockProps) => {
  return (
    <>
      <Center my="10">
        <CountdownCircleTimer
          key={timer}
          isPlaying={animate}
          duration={timer * 60}
          colors={[
            ['#fe6f6b', 0.33],
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
        >
          {children}
        </CountdownCircleTimer>
      </Center>
    </>
  )
}
