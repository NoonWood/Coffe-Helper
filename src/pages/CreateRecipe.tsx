import React, { FC } from 'react'
import { Heading, Box } from '@chakra-ui/react'
import CreateRecipeForm from '../components/CreateRecipeForm/CreateRecipeForm'
// import { addRecipeAction } from '../stor/reducers/recipeReducer'
import { addRecipeAction, Recipe } from '../stor/slices/recipeSlice'
import { v4 as uid } from 'uuid'
import { useAppDispatch } from '../hooks/hooksRedux'

const CreateRecipe: FC = () => {
  const dispatch = useAppDispatch()
  const addRecipe = (newRecipe: Recipe) => {
    newRecipe.id = uid()
    dispatch(addRecipeAction(newRecipe))
  }

  return (
    <>
      <Box py="2">
        <Heading size="xl">Create Recipe</Heading>
        <CreateRecipeForm addRecipe={addRecipe} />
      </Box>
    </>
  )
}

export default CreateRecipe
