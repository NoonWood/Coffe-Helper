import React, { FC, useEffect, useRef } from 'react'
import { BsCalculator } from 'react-icons/bs'
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
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'

interface CalculatorHookFormProps {
  grams: string
}
const CalculatorHookForm: FC<CalculatorHookFormProps> = ({ grams }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = React.useRef(null)

  const { register, watch, setValue } = useForm({
    defaultValues: {
      gramsPerLiter: parseInt(grams),
      gramsPerCup: 250,
      cupNum: 1,
      portion: 15,
      radio: 'portion',
    },
  })

  const watchGramsPerLiter = watch('gramsPerLiter')
  const watchGramsPerCup = watch('gramsPerCup')
  const watchCupNum = watch('cupNum')
  const watchPortion = watch('portion')
  const watchRadio = watch('radio')

  useEffect(() => {
    if (watchRadio === 'portion') {
      let portion =
        watchCupNum * ((watchGramsPerLiter * watchGramsPerCup) / 1000)

      setValue('portion', portion)
    } else {
      let wather = (1000 * watchPortion * watchCupNum) / watchGramsPerLiter

      setValue('gramsPerCup', wather)
    }
  }, [watchGramsPerLiter, watchGramsPerCup, watchCupNum, watchPortion])

  // const onSubmit = (values) => {
  //   alert(JSON.stringify(values, null, 2))
  // }

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="outline"
        colorScheme="teal"
        aria-label="Calculator"
        fontSize="20px"
        icon={<BsCalculator />}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Calculate </ModalHeader>
          <ModalCloseButton />

          <form>
            <ModalBody pb={6}>
              <RadioGroup defaultValue={'portion'}>
                <Stack direction="row">
                  <Radio
                    {...register('radio')}
                    type="radio"
                    value="portion"
                    ref={initialRef}
                  >
                    Порция
                  </Radio>
                  <Radio {...register('radio')} type="radio" value="wather">
                    Вода
                  </Radio>
                </Stack>
              </RadioGroup>

              <FormControl>
                <FormLabel>Количество грамм на литр:</FormLabel>
                <Input
                  {...register('gramsPerLiter')}
                  type="number"
                  placeholder="Введите количество грамм на литр"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Объем воды в мл:</FormLabel>
                <Input
                  {...register('gramsPerCup')}
                  type="number"
                  disabled={watchRadio === 'wather'}
                  placeholder="Введите объем воды в мл"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Количество чашек:</FormLabel>
                <Input
                  {...register('cupNum')}
                  type="number"
                  placeholder="Введите количество чашек"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Порция в г:</FormLabel>
                <Input
                  {...register('portion')}
                  type="number"
                  disabled={watchRadio === 'portion'}
                  placeholder="Введите порцию в г"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              {/* <Button type="submit" colorScheme="blue" mr={3}>
                Calculate
              </Button> */}
              <Button onClick={onClose} ref={finalRef}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CalculatorHookForm
