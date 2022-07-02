import React, { FC, useLayoutEffect } from 'react'

import { Progress, Button, Flex, Box } from '@chakra-ui/react'

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useBoundingRect } from '../../../hooks'

interface SliderProps {
  setTrackIsActive: React.Dispatch<React.SetStateAction<boolean>>
  initSliderWidth: (width: number) => void
  setActiveItem: React.Dispatch<React.SetStateAction<number>>
  activeItem: number
  constraint: number
  itemWidth: number
  positions: any
  children: any
  gap: number
}

const percentage = (x: number, y: number) => {
  return 100 / (y / x)
}

const Slider: FC<SliderProps> = ({
  setTrackIsActive,
  initSliderWidth,
  setActiveItem,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  gap,
}) => {
  const [ref, { width }] = useBoundingRect()
  const _ref: any = ref // TODO

  useLayoutEffect(() => {
    if (width) {
      initSliderWidth(Math.round(width))
    }
  }, [width, initSliderWidth])

  const handleFocus = () => setTrackIsActive(true)

  const handleDecrementClick = () => {
    setTrackIsActive(true)
    !(activeItem === positions.length - positions.length) &&
      setActiveItem((prev) => prev - 1)
  }

  const handleIncrementClick = () => {
    setTrackIsActive(true)
    !(activeItem === positions.length - constraint) &&
      setActiveItem((prev) => prev + 1)
  }

  return (
    <>
      <Box
        ref={_ref}
        w={{ base: '100%', md: `calc(100% + ${gap}px)` }}
        ml={{ base: 0, md: `-${gap / 2}px` }}
        px={`${gap / 2}px`}
        position="relative"
        overflow="hidden"
        _before={{
          bgGradient: 'linear(to-r, base.d400, transparent)',
          position: 'absolute',
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: '100%',
          left: 0,
          top: 0,
        }}
        _after={{
          bgGradient: 'linear(to-l, base.d400, transparent)',
          position: 'absolute',
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: '100%',
          right: 0,
          top: 0,
        }}
      >
        {children}
      </Box>

      <Flex w={`${itemWidth}px`} mt={`${gap / 2}px`} mx="auto">
        <Button
          onClick={handleDecrementClick}
          onFocus={handleFocus}
          mr={`${gap / 3}px`}
          color="gray.200"
          variant="link"
          minW={0}
        >
          <ArrowBackIcon boxSize={6} />
        </Button>

        <Progress
          value={percentage(activeItem, positions.length - constraint)}
          alignSelf="center"
          borderRadius="2px"
          bg="base.d100"
          flex={1}
          h="3px"
          sx={{
            '> div': {
              backgroundColor: 'gray.400',
            },
          }}
        />

        <Button
          onClick={handleIncrementClick}
          onFocus={handleFocus}
          ml={`${gap / 3}px`}
          color="gray.200"
          variant="link"
          zIndex={2}
          minW={0}
        >
          <ArrowForwardIcon boxSize={6} />
        </Button>
      </Flex>
    </>
  )
}

export default Slider
