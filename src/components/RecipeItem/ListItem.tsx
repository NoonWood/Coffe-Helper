import React, { FC, useState } from 'react'

import { Badge, Box } from '@chakra-ui/react'
import TimerItem from './TimerItem'
import { RecipeStep } from '../../stor/slices/recipeSlice'

const ListItem: FC<RecipeStep> = ({ text, timer, id }) => {
  const [isDone, setDone] = useState(false)
  const handlerDone = () => {
    setDone(isDone ? false : true)
  }
  if (timer) {
    return <TimerItem text={text} timer={timer} id={id} />
  } else {
    return (
      <Box
        w={450}
        maxW={450}
        mb={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        backgroundColor={isDone ? 'green.500' : undefined}
        cursor="pointer"
        key={id}
        onClick={() => {
          handlerDone()
        }}
      >
        <Box p="4">
          <Box display="flex" alignItems="baseline">
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
              {text}
            </Box>
          </Box>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Operation
          </Badge>
        </Box>
      </Box>
    )
  }
}

export default ListItem
