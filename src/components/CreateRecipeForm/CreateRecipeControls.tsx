import React, { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Flex,
  Button,
  Spacer,
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Radio,
  Stack,
  Textarea,
} from '@chakra-ui/react'

import { RecipeStep } from '../../stor/slices/recipeSlice'

interface CreateRecipeControlsProps {
  handlerAdd: (values: RecipeStep) => void
}

const CreateRecipeControls: FC<CreateRecipeControlsProps> = ({
  handlerAdd,
}) => {
  const [thisIs, setThisIs] = useState('option')
  const { register, setValue, handleSubmit } = useForm<RecipeStep>()

  const onSubmit: SubmitHandler<RecipeStep> = (values) => {
    // alert(JSON.stringify(values, null, 2))
    handlerAdd(values)
    setValue('text', '')
    setValue('timer.minutes', 0)
    setValue('timer.seconds', 0)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box minWidth="max-content" w={500}>
          <Heading p={4} size="md">
            Добавить действие
          </Heading>
          <RadioGroup defaultValue={thisIs} onChange={setThisIs} mb={6}>
            <Stack direction="row" spacing={5}>
              <Radio {...register('radio')} value="option">
                Действие
              </Radio>
              <Radio {...register('radio')} value="timer">
                Таймер
              </Radio>
            </Stack>
          </RadioGroup>

          <Textarea {...register('text')} placeholder="Описание" />
          {thisIs === 'timer' ? (
            <>
              <Text>Minutes</Text>
              <NumberInput defaultValue={0} min={0} max={60}>
                <NumberInputField {...register('timer.minutes')} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Text>Seconds</Text>
              <NumberInput defaultValue={0} min={0} max={60}>
                <NumberInputField {...register('timer.seconds')} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </>
          ) : (
            <></>
          )}
        </Box>
        <Spacer />
      </Flex>
      <Button p="2" m={2} type="submit" colorScheme="teal">
        Добавить
      </Button>
    </form>
  )
}

export default CreateRecipeControls
