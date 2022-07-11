import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react'
import { Section } from '../../stor/slices/sectionSlice'
import { useAddSectionMutation } from '../../stor/api/sectionApi'

// interface CreateSectionFormProps {
//   // addSection: (nevSection: Section) => void
// }

const CreateSectionForm: FC = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Section>({
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const [addSection, { isLoading, isError }] = useAddSectionMutation()

  const createError = (rejected: any) => {
    setError('name', {
      type: 'server',
      message: `${rejected.data.message}`,
    })
  }

  function onSubmit(values: Section) {
    let newSection = values
    addSection(newSection)
      .unwrap()
      .then(() => {
        navigate(`/sections`)
      })
      .catch((rejected) => createError(rejected))
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors?.name}>
            <FormLabel mt={4} htmlFor="name">
              Название раздела
            </FormLabel>
            <Input
              id="name"
              placeholder="Название"
              {...register('name', {
                required: 'This is required',
              })}
            />

            <FormLabel mt={4} htmlFor="description">
              Описание раздела
            </FormLabel>
            <Textarea
              id="description"
              placeholder="Описание раздела"
              {...register('description')}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <HStack spacing="24px" justify="center" mt={4} bottom="20">
            <Button
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
              mb={10}
            >
              Готово
            </Button>
          </HStack>
        </form>
      </SimpleGrid>
    </>
  )
}

export default CreateSectionForm
