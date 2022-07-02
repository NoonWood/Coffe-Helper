import React, { FC } from 'react'
import { FaPen } from 'react-icons/fa'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  IconButton,
} from '@chakra-ui/react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { RecipeStep } from '../../../stor/slices/recipeSlice'

interface ItemEditModalProps {
  step: RecipeStep
  onEdit: (values: RecipeStep) => void
}

const ItemEditModal: FC<ItemEditModalProps> = ({ onEdit, step }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const initialRef = useRef()
  const { register, handleSubmit } = useForm<SubmitionProps>({
    defaultValues: {
      text: step.text,
      minutes: step.timer?.minutes,
      seconds: step.timer?.seconds,
    },
  })

  // const watchText = watch('text')
  // const watchMin = watch('minutes')
  // const watchSec = watch('seconds')

  // useEffect(() => {})

  interface SubmitionProps {
    text: string
    minutes: number
    seconds: number
  }
  const onSubmit: SubmitHandler<SubmitionProps> = (values) => {
    let editStep = {
      text: values.text,
      timer: step.timer
        ? {
            minutes: values.minutes ? values.minutes : 0,
            seconds: values.seconds ? values.seconds : 0,
          }
        : null,
      radio: step?.radio,
      id: step.id,
    }
    onEdit(editStep)
    onClose()
  }

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        colorScheme="teal"
        aria-label="Calculator"
        fontSize="20px"
        icon={<FaPen />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Edit </ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Количество грамм на литр:</FormLabel>
                <Input
                  {...register('text')}
                  placeholder="Введите описание рецепта"
                />
              </FormControl>
            </ModalBody>

            {step.timer ? (
              <>
                <ModalBody pb={6}>
                  <FormControl mt={4}>
                    <FormLabel>Minutes:</FormLabel>
                    <Input
                      {...register('minutes')}
                      type="number"
                      placeholder="Введите количество минут"
                    />
                  </FormControl>
                </ModalBody>
                <ModalBody pb={6}>
                  <FormControl mt={4}>
                    <FormLabel>Seconds:</FormLabel>
                    <Input
                      {...register('seconds')}
                      type="number"
                      placeholder="Введите количество секунд"
                    />
                  </FormControl>
                </ModalBody>
              </>
            ) : (
              <></>
            )}

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Edit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ItemEditModal
