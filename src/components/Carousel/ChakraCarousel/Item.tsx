import React, {
  FC,
  useState,
  FocusEventHandler,
  KeyboardEventHandler,
} from 'react'
import { Flex } from '@chakra-ui/react'

interface ItemProps {
  setTrackIsActive: React.Dispatch<React.SetStateAction<boolean>>
  trackIsActive: boolean
  setActiveItem: React.Dispatch<React.SetStateAction<number>>
  activeItem: number
  constraint: number
  itemWidth: number
  positions: any
  gap: number
  index: any
  children: any
}

const Item: FC<ItemProps> = ({
  setTrackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  index,
  gap,
}) => {
  const [userDidTab, setUserDidTab] = useState(false)

  const handleFocus: FocusEventHandler<HTMLDivElement> = () =>
    setTrackIsActive(true)

  const handleBlur: FocusEventHandler<HTMLDivElement> = () => {
    userDidTab && index + 1 === positions.length && setTrackIsActive(false)
    setUserDidTab(false)
  }

  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) =>
    event.key === 'Tab' &&
    !(activeItem === positions.length - constraint) &&
    setActiveItem(index)

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) =>
    event.key === 'Tab' && setUserDidTab(true)

  return (
    <Flex
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      w={`${itemWidth}px`}
      _notLast={{
        mr: `${gap}px`,
      }}
      py="4px"
    >
      {children}
    </Flex>
  )
}

export default Item
