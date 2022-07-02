import React, { FC } from 'react'
import { Flex, Heading, Box, Text, Spacer, Badge } from '@chakra-ui/react'
import { useParams, Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/hooksRedux'

import ListItem from '../components/RecipeItem/ListItem'
import Calculator from '../components/Calculator/Calculator'
import useAuth from '../hooks/useAuth'

const Recipe: FC = () => {
  const { name } = useParams()
  const { isAuth } = useAuth()
  const recipes = useAppSelector((state) => state.recipe)
  const thisRecipe = recipes.find((recipe) => recipe.name === name)
  if (thisRecipe === undefined) {
    return null
  } else {
    return (
      <>
        <Box py="2">
          {recipes && (
            <>
              <Heading size="xl">{name}</Heading>

              <Text>{thisRecipe.description}</Text>
              <Badge variant="solid" colorScheme="green">
                {thisRecipe.section}
              </Badge>
              <Flex mt={6}>
                <Box>
                  {thisRecipe.recipeSteps.map((item) => (
                    <ListItem
                      text={item.text}
                      timer={item.timer}
                      key={item.id}
                      id={item.id}
                    />
                  ))}
                </Box>

                <Spacer />
                <Calculator grams={thisRecipe.grams} />
              </Flex>

              {isAuth && (
                <Link to={`/recipes/${name}/edit`}>Edit this recipe</Link>
              )}
            </>
          )}
        </Box>
      </>
    )
  }
}

export default Recipe
