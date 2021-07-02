export const foo = 'foo'

// import { Box, Text, Center, Stack, HStack, Button, VStack } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import { CountdownCircleTimer } from 'react-countdown-circle-timer'

// interface IClockProps {
//   studyTime: number
//   breakTime: number
// }

// const timerProps = {
//   size: 150,
//   strokeWidth: 8,
// }

// const minuteSeconds = 60
// const hourSeconds = 3600
// const daySeconds = 86400

// const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0
// const getTimeMinutes = (time: number) => ((time % hourSeconds) / minuteSeconds) | 0
// const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0
// const getTimeDays = (time: number) => (time / daySeconds) | 0

// export const Clock = ({ studyTime, breakTime }: IClockProps) => {
//   const [start, setStart] = useState(false)

//   const remainingTime = studyTime
//   return (
//     <>
//       <Center>
//         <Stack>
//           <HStack>
//             <CountdownCircleTimer
//               {...timerProps}
//               isPlaying={start}
//               duration={getTimeMinutes(remainingTime)}
//               initialRemainingTime={studyTime - 1}
//               colors={[
//                 ['#004777', 0.33],
//                 ['#F7B801', 0.33],
//                 ['#A30000', 0.33],
//               ]}
//             >
//               {({ remainingTime }) => {
//                 return (
//                   <VStack>
//                     <Text fontWeight="bold" fontSize="2xl">
//                       {remainingTime}
//                     </Text>
//                     <Text fontSize="lg" fontWeight="semibold">
//                       {remainingTime! > 1 ? 'minute' : 'minutes'}
//                     </Text>
//                   </VStack>
//                 )
//               }}
//             </CountdownCircleTimer>
//             <CountdownCircleTimer
//               {...timerProps}
//               isPlaying={start}
//               duration={minuteSeconds}
//               onComplete={(totalElapsedTime: number): any => [remainingTime - totalElapsedTime > 0]}
//               colors={[
//                 ['#004777', 0.33],
//                 ['#F7B801', 0.33],
//                 ['#A30000', 0.33],
//               ]}
//             >
//               {({ remainingTime }) => {
//                 return (
//                   <VStack>
//                     <Text fontWeight="bold" fontSize="2xl">
//                       {remainingTime}
//                     </Text>
//                     <Text fontSize="lg" fontWeight="semibold">
//                       {remainingTime! > 1 ? 'second' : 'seconds'}
//                     </Text>
//                   </VStack>
//                 )
//               }}
//             </CountdownCircleTimer>
//           </HStack>
//         </Stack>
//       </Center>
//       <Center>
//         <Stack>
//           <HStack>
//             <Button onClick={() => setStart(!start)}>{start ? 'Stop' : 'Start'}</Button>
//           </HStack>
//         </Stack>
//       </Center>
//     </>
//   )
// }
