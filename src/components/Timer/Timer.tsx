import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { FC, Fragment, memo } from 'react'

import { useStateProvider } from '../../contexts/stateProvider'
import { useTimer } from '../../hooks/useTimer'
import TimerControls from './TimerControls'
import TimerTitle from './TimerTitle'

interface TimerProps {
  time: number
}
const Timer: FC<TimerProps> = memo(({ time }) => {
  const [state] = useStateProvider()
  const timeredValue = useTimer()
  const boxColor = useColorModeValue('red.500', 'gray.900')
  const sessionTitleColor = useColorModeValue('gray.100', 'red.100')
  const iconColor = useColorModeValue('red.500', 'gray.500')

  return (
    <Fragment>
      <Box p="2em" m="2rem" borderRadius="50px" boxShadow="base" bg={boxColor}>
        <TimerTitle
          size="lg"
          text={state.timerLabel}
          color={sessionTitleColor}
          paddingX="0"
          paddingY="0"
        />
        <TimerTitle
          size="3xl"
          text={timeredValue}
          paddingX="10px"
          paddingY="10px"
          color={sessionTitleColor}
        />
        <TimerControls iconColor={iconColor} time={time} />
      </Box>
    </Fragment>
  )
})

export default Timer
