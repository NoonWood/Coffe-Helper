import React, { FC, useEffect, useRef, useState } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { FaPlay, FaRedoAlt, FaPause } from 'react-icons/fa'

import { useTimer } from '../../hooks/useTimer'
import { useStateProvider } from '../../contexts/stateProvider'
import { actionTypes } from '../../stor/reducers/timerReducer'

interface TimerControlsProps {
  iconColor: string
  time: number
}
const TimerControls: FC<TimerControlsProps> = ({ iconColor, time }) => {
  const [state, dispatch] = useStateProvider()

  const [timer] = useState(time)

  const timeredValue = useTimer()
  const notificationUrl =
    'https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3'
  const notificationRef = useRef<HTMLAudioElement | null>(null)

  const setTime = () => {
    dispatch({
      ...state,
      type: actionTypes.SET_TIME,
      timerValue: timer,
    })
  }

  const handlePauseAndPlay = () => {
    dispatch({
      ...state,
      type: actionTypes.TOGGLE_BUSY,
      isBusy: !state.isBusy,
    })
  }

  const handleReset = () => {
    // dispatch({
    //   ...state,
    //   type: actionTypes.RESET_TIMER,
    // })
    setTime()
    if (notificationRef !== null) {
      notificationRef?.current?.pause()
      // notificationRef.current.time = 0
    }
  }

  const handleTimeCounting = () => {
    dispatch({
      ...state,
      type: actionTypes.START_TIMER,
      timerValue: state.timerValue - 1,
    })

    if (state.timerValue === 0) {
      if (notificationRef !== null) {
        notificationRef?.current?.play()
      }
      if (state.timerLabel === 'Session') {
        dispatch({
          ...state,
          type: actionTypes.SET_TIME,
          timerValue: timer,
        })
        dispatch({
          ...state,
          type: actionTypes.TOGGLE_BUSY,
          isBusy: false,
        })
      }
    }
  }

  useEffect(() => {
    setTime()
  }, [])

  useEffect(() => {
    if (state.isBusy) {
      let timerInterval = setInterval(() => {
        handleTimeCounting()
        document.title = `[${state.timerLabel} | ${timeredValue}]`
      }, 1000)
      return () => clearInterval(timerInterval)
    }
  })

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-evenly"
      alignContent="center"
      pt="10px"
    >
      <IconButton
        aria-label="Play"
        size="lg"
        isRound
        onClick={handlePauseAndPlay}
        icon={!state.isBusy ? <FaPlay /> : <FaPause />}
        color={iconColor}
        _hover={{
          transform: 'scale(1.1)',
        }}
      />
      <IconButton
        aria-label="Restart"
        size="lg"
        isRound
        onClick={handleReset}
        icon={<FaRedoAlt />}
        color={iconColor}
        _hover={{
          transform: 'scale(1.1)',
        }}
      />
      <audio src={notificationUrl} ref={notificationRef} preload="auto" />
    </Flex>
  )
}

export default TimerControls
