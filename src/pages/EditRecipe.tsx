import React, { FC, useEffect, useState } from 'react'
import { Flex, Spacer, Heading, Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/hooksRedux'
import CreateRecipeForm from '../components/CreateRecipeForm/CreateRecipeForm'
import {
  editRecipeAction,
  removeRecipeAction,
  Recipe,
} from '../stor/slices/recipeSlice'
import DeleteRecipe from '../components/DeleteRecipe/DeleteRecipe'

const EditRecipe: FC = () => {
  const { name } = useParams()
  const recipes = useAppSelector((state) => state.recipe)
  const thisRecipe = recipes.find((recipe) => recipe.name === name)
  const [_recipe, setRecipe] = useState(thisRecipe)
  useEffect(() => {
    setRecipe(thisRecipe)
  }, [thisRecipe])

  const dispatch = useAppDispatch()
  const editRecipe = (recipe: Recipe) => {
    dispatch(editRecipeAction(recipe))
  }

  const deleteRecipe = (removableRecipe: Recipe) => {
    dispatch(removeRecipeAction(removableRecipe))
  }
  if (_recipe === undefined) {
    return null
  }

  return (
    <>
      <Box py="2">
        <Flex>
          <Heading size="xl">Edit Recipe {_recipe.name} </Heading>
          <Spacer />
          <DeleteRecipe recipe={_recipe} deleteRecipe={deleteRecipe} />
        </Flex>
        <CreateRecipeForm recipe={_recipe} editRecipe={editRecipe} />
      </Box>
    </>
  )
}

export default EditRecipe
