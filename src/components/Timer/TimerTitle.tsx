import React, { FC, memo } from 'react'
import { Heading } from '@chakra-ui/react'

interface TimerTitleProps {
  size: string
  text: string
  paddingX: string
  paddingY: string
  color: string
}
const TimerTitle: FC<TimerTitleProps> = memo(
  ({ size, text, paddingX, paddingY, color }) => {
    return (
      <Heading size={size} px={paddingX} py={paddingY} color={color}>
        {text}
      </Heading>
    )
  }
)

export default TimerTitle
