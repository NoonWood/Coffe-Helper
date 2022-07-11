import React, { FC, useState, useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { v4 as uid } from 'uuid'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  HStack,
  Divider,
  Select,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import CreateRecipeControls from './CreateRecipeControls'
import ItemGroup from './CreateRecipeItem/ItemGroup'

import { Recipe, RecipeStep } from '../../stor/slices/recipeSlice'
import {
  useAddRecipeMutation,
  useUpdateRecipeMutation,
} from '../../stor/api/recipeApi'

interface CreateRecipeFormProps {
  recipe?: Recipe
  // editRecipe?: (newRecipe: Recipe) => void
  // addRecipe?: (newRecipe: Recipe) => void
  // isLoading?: boolean
  event?: 'Add' | 'Edit'
}

const CreateRecipeForm: FC<CreateRecipeFormProps> = ({ recipe, event }) => {
  const [steps, setSteps] = useState<RecipeStep[]>([])
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams()
  let sectionName = searchParams.get('name')
  if (!sectionName) sectionName = ''

  const [addRecipe, { isLoading: addLoading, isError: addError }] =
    useAddRecipeMutation()
  const [editRecipe, { isLoading: editLoading, isError: editError }] =
    useUpdateRecipeMutation()

  const {
    handleSubmit,
    register,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Recipe>({
    defaultValues: {
      name: '',
      description: '',
      grams: '15',
      section: sectionName,
    },
  })

  useEffect(() => {
    if (recipe) {
      setSteps(recipe.recipeSteps)
      reset({
        name: recipe.name,
        description: recipe.description,
        grams: recipe.grams,
        section: recipe.section,
      })
    }
  }, [])

  const createError = (rejected: any) => {
    setError('name', {
      type: 'server',
      message: `${rejected.data.message}`,
    })
  }

  const onSubmit: SubmitHandler<Recipe> = (values) => {
    let newRecipe = values

    newRecipe.recipeSteps = steps
    if (recipe) {
      newRecipe.id = recipe.id
      if (newRecipe && event === 'Edit') {
        editRecipe(newRecipe)
          .unwrap()
          .then(() => {
            navigate(`/recipes/${newRecipe.name}`)
          })
          .catch((rejected) => createError(rejected))
      }
    } else {
      if (newRecipe && event === 'Add') {
        addRecipe(newRecipe)
          .unwrap()
          .then(() => {
            navigate(`/recipes/${newRecipe.name}`)
          })
          .catch((rejected) => createError(rejected))
      }
    }
  }

  const handlerAdd = (value: RecipeStep) => {
    setSteps((list) => {
      value.id = uid()
      // value.key = uid()

      if (value.radio === 'option') {
        value.timer = null
      }

      // alert(JSON.stringify(value, null, 2))
      return [...steps, value]
    })
  }

  const onEdit = (value: RecipeStep) => {
    const targetElement = steps.find((step) => step.id === value.id)
    if (targetElement !== undefined) {
      const targetIndex = steps.indexOf(targetElement)
      const targetItem = steps[targetIndex]
      const editedTarget = { ...targetItem, ...value }
      const items = [...steps]
      items.splice(targetIndex, 1, editedTarget)
      setSteps([...items])
    }
  }

  const onRemove = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors?.name}>
            <FormLabel mt={4} htmlFor="name">
              Название рецепта
            </FormLabel>
            <Input
              id="name"
              placeholder="Название"
              {...register('name', {
                required: 'This is required',
              })}
            />

            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormLabel mt={4} htmlFor="description">
            Описание рецепта
          </FormLabel>
          <Textarea
            id="description"
            placeholder="Описание рецепта"
            {...register('description')}
          />

          <FormLabel mt={4} htmlFor="grams">
            Грамм на литр
          </FormLabel>
          <Controller
            control={control}
            name="grams"
            render={({ field: { ref, ...restField } }) => (
              <NumberInput step={1} defaultValue={15} min={0} {...restField}>
                <NumberInputField ref={ref} name={restField.name} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />

          <FormLabel mt={4} htmlFor="section">
            Раздел
          </FormLabel>
          <Select mt={4} placeholder="Section" {...register('section')}>
            <option value="Чай">Чай</option>
            <option value="Кофе">Кофе</option>
          </Select>

          <HStack spacing="24px" justify="center" mt={4} bottom="20">
            <Button
              // justify="center"
              colorScheme="teal"
              isLoading={addLoading && editLoading}
              type="submit"
              mb={10}
            >
              Готово
            </Button>
          </HStack>
        </form>
        <CreateRecipeControls handlerAdd={handlerAdd} />
      </SimpleGrid>
      <Divider />

      <HStack spacing="24px" justify="center" mt={4} bottom="20">
        <ItemGroup
          steps={steps}
          // key={steps.id}
          setSteps={setSteps}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      </HStack>
    </>
  )
}

export default CreateRecipeForm
