import { Text, Box, Center, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CustomRadios } from './CustomRadios'
import { usePomodoro } from '../store/usePomodoro'
import { TimeSettings } from './TimeSettings'
import { Clock } from './Clock'

export const Timer = () => {
  const selectedTypeRadio = usePomodoro((state: any) => state.selectedTypeRadio)
  const timeSettings = usePomodoro((state: any) => state.timeSettings)
  const [start, setStart] = useState(false)
  const [timer, setTimer] = useState(timeSettings[selectedTypeRadio])

  useEffect(() => {
    setTimer(timeSettings[selectedTypeRadio])
  }, [timeSettings, selectedTypeRadio])

  const children = ({ remainingTime }: { remainingTime: number }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    const secToRender = seconds < 10 ? `0${seconds}` : seconds
    return (
      <>
        <Text fontSize="2xl" fontWeight="bold">
          {minutes}:{secToRender}
        </Text>
      </>
    )
  }

  return (
    <Box m="2">
      <Text fontSize="lg" align="center" mb="2" fontWeight="semibold">
        Pomodoro
      </Text>
      <Center>
        <CustomRadios />
      </Center>
      <TimeSettings />
      {timeSettings.study !== 0 ? (
        <>
          <Clock timer={timer} animate={start} children={children} />
          <Center>
            <Button onClick={() => setStart(!start)}>{start ? 'Stop' : 'Start'}</Button>
          </Center>
        </>
      ) : null}
    </Box>
  )
}
