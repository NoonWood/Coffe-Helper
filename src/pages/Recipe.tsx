import React, { FC, memo } from 'react'
import { Flex, Heading, Box, Text, Spacer, Badge } from '@chakra-ui/react'
import { useParams, Link } from 'react-router-dom'
// import { useAppSelector } from '../hooks/hooksRedux'

import ListItem from '../components/RecipeItem/ListItem'
import Calculator from '../components/Calculator/Calculator'
import useAuth from '../hooks/useAuth'
import { useGetRecipeByNameQuery } from '../stor/api/recipeApi'

const Recipe: FC = memo(() => {
  const { name = '' } = useParams()
  const { isAuth } = useAuth()

  // const recipes = useAppSelector((state) => state.recipe)
  // const thisRecipe = recipes.find((recipe) => recipe.name === name)

  const {
    data: recipe,
    error: error,
    isLoading: isLoading,
    isSuccess: isSuccess,
    isFetching: isFetching,
  } = useGetRecipeByNameQuery(name)

  if (recipe === undefined) {
    return null
  } else {
    return (
      <>
        <Box py="2">
          <>
            <Heading size="xl">{name}</Heading>

            <Text>{recipe.description}</Text>
            <Badge variant="solid" colorScheme="green">
              {recipe.section}
            </Badge>
            <Flex mt={6}>
              <Box>
                {recipe.recipeSteps.map((item) => (
                  <ListItem
                    text={item.text}
                    timer={item.timer}
                    key={item.id}
                    id={item.id}
                  />
                ))}
              </Box>

              <Spacer />
              <Calculator grams={recipe.grams} />
            </Flex>

            {isAuth && (
              <Link to={`/recipes/${name}/edit`}>Edit this recipe</Link>
            )}
          </>
        </Box>
      </>
    )
  }
})

export default Recipe
