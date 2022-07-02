import React, { FC, useState } from 'react'

import {
  Flex,
  Badge,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import DataContainer from '../Timer/DataContainer'
import Timer from '../Timer/Timer'
import { RecipeStep } from '../../stor/slices/recipeSlice'

const TimerItem: FC<RecipeStep> = ({ text, timer, id }) => {
  const [isDone, setDone] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handlerDone = () => {
    setDone(isDone ? false : true)
  }

  let time: number = 0
  if (timer) {
    time = Number(timer.seconds) + Number(timer.minutes) * 60
  }

  return (
    <>
      <Box
        w={450}
        maxW={450}
        mb={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        backgroundColor={isDone ? 'green.500' : undefined}
        cursor="pointer"
        onClick={() => {
          handlerDone()
          onOpen()
        }}
      >
        <Box p="4">
          <Box display="flex" alignItems="baseline">
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="Purple ">
              {text}
            </Box>
          </Box>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Timer
          </Badge>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Timer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minH="80vh"
            >
              <DataContainer>
                <Timer time={time} />
              </DataContainer>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TimerItem
