import { useEffect, useState } from 'react'

import { Box, Heading, Divider, Stack, Skeleton } from '@chakra-ui/react'
import Carusel from '../components/Carousel/Carousel'
import SimpleCardList from '../components/SimpleCard/SimpleCardList'
import { useListSectionsLimitQuery } from '../stor/api/sectionApi'
import { useListRecipesLimitQuery } from '../stor/api/recipeApi'
import { Section } from '../stor/slices/sectionSlice'
import { Recipe } from '../stor/slices/recipeSlice'

function Home() {
  const {
    data: section,
    error: errorSect,
    isLoading: isLoadingSect,
    isSuccess: isSuccessSect,
    isFetching: isFetchingSect,
  } = useListSectionsLimitQuery({
    page: 1,
    limit: 6,
  })

  const {
    data: recipe,
    error: errorRecipe,
    isLoading: isLoadingRecipe,
    isSuccess: isSuccessRecipe,
    isFetching: isFetchingRecipe,
  } = useListRecipesLimitQuery({
    page: 1,
    limit: 9,
  })

  const [sections, setSections] = useState<Section[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    if (isSuccessSect) {
      setSections(section?.items)
    }

    if (isSuccessRecipe) {
      setRecipes(recipe?.items)
    }
  }, [isSuccessSect, isSuccessRecipe])

  return (
    <Box py="2">
      {/* {(errorSect || errorRecipe) && <p>An error occured</p>} */}

      <Carusel cards={sections} />

      <Heading size="xl">Daily best</Heading>
      <Divider />

      {!isFetchingRecipe && <SimpleCardList items={recipes} />}

      {isFetchingRecipe && (
        <Stack padding={4} spacing="23px">
          <Skeleton
            width="100%"
            height="82px"
            startColor="pink.500"
            endColor="orange.500"
            isLoaded={false}
          />
          <Skeleton
            width="100%"
            height="82px"
            startColor="pink.500"
            endColor="orange.500"
            isLoaded={false}
          />
          <Skeleton
            width="100%"
            height="82px"
            startColor="pink.500"
            endColor="orange.500"
            isLoaded={false}
          />
        </Stack>
      )}
    </Box>
  )
}

export default Home
