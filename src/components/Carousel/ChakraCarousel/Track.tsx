import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEventHandler,
  DragEvent,
} from 'react'
import { VStack, Flex } from '@chakra-ui/react'
import {
  EventInfo,
  motion,
  PanInfo,
  useAnimation,
  useMotionValue,
} from 'framer-motion'

const MotionFlex = motion(Flex)

interface TrackProps {
  setTrackIsActive: React.Dispatch<React.SetStateAction<boolean>>
  trackIsActive: boolean
  setActiveItem: React.Dispatch<React.SetStateAction<number>>
  sliderWidth: number
  activeItem: number
  constraint: number
  multiplier: number
  itemWidth: number
  positions: any
  children: any
  gap: number
}

const Track: FC<TrackProps> = ({
  setTrackIsActive,
  trackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  multiplier,
  itemWidth,
  positions,
  children,
}) => {
  const [dragStartPosition, setDragStartPosition] = useState(0)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const node = useRef<HTMLDivElement>(null)
  const transitionProps = {
    stiffness: 400,
    type: 'spring',
    damping: 60,
    mass: 3,
  }

  const handleDragStart = () => setDragStartPosition(positions[activeItem])

  const handleDragEnd = (_: DragEvent, info: PanInfo) => {
    const distance = info.offset.x
    const velocity = info.velocity.x * multiplier
    const direction = velocity < 0 || distance < 0 ? 1 : -1

    const extrapolatedPosition =
      dragStartPosition +
      (direction === 1
        ? Math.min(velocity, distance)
        : Math.max(velocity, distance))

    const closestPosition = positions.reduce((prev: number, curr: number) => {
      return Math.abs(curr - extrapolatedPosition) <
        Math.abs(prev - extrapolatedPosition)
        ? curr
        : prev
    }, 0)

    if (!(closestPosition < positions[positions.length - constraint])) {
      setActiveItem(positions.indexOf(closestPosition))
      controls.start({
        x: closestPosition,
        transition: {
          velocity: info.velocity.x,
          ...transitionProps,
        },
      })
    } else {
      setActiveItem(positions.length - constraint)
      controls.start({
        x: positions[positions.length - constraint],
        transition: {
          velocity: info.velocity.x,
          ...transitionProps,
        },
      })
    }
  }

  const handleResize = useCallback(
    () =>
      controls.start({
        x: positions[activeItem],
        transition: {
          ...transitionProps,
        },
      }),
    [activeItem, controls, positions]
  )

  const handleClick = useCallback(
    (event: MouseEvent) =>
      node?.current?.contains(event.target as Node)
        ? setTrackIsActive(true)
        : setTrackIsActive(false),
    [setTrackIsActive]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (trackIsActive) {
        if (activeItem < positions.length - constraint) {
          if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault()
            setActiveItem((prev) => prev + 1)
          }
        }
        if (activeItem > positions.length - positions.length) {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault()
            setActiveItem((prev) => prev - 1)
          }
        }
      }
    },
    [trackIsActive, setActiveItem, activeItem, constraint, positions.length]
  )

  useEffect(() => {
    handleResize()

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [handleClick, handleResize, handleKeyDown, positions])

  return (
    <>
      {!!itemWidth && (
        <VStack ref={node} spacing={5} alignItems="stretch">
          <MotionFlex
            dragConstraints={node}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x }}
            drag="x"
            _active={{ cursor: 'grabbing' }}
            minWidth="min-content"
            flexWrap="nowrap"
            cursor="grab"
          >
            {children}
          </MotionFlex>
        </VStack>
      )}
    </>
  )
}

export default Track
