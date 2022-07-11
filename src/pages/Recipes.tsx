import React, { FC } from 'react'
import {
  Heading,
  Box,
  HStack,
  Button,
  Icon,
  Skeleton,
  Stack,
} from '@chakra-ui/react'

import SimpleCardList from '../components/SimpleCard/SimpleCardList'
import CardAdd from '../components/CardAdd/CardAdd'
import useAuth from '../hooks/useAuth'

import { useListRecipesLimitQuery } from '../stor/api/recipeApi'
import Pagination from '../components/Pagination/Pagination'

const Recipes: FC = () => {
  // const recipes = useAppSelector((state) => state.recipe)
  const [page, setPage] = React.useState(1)
  const { data, error, isLoading, isSuccess, isFetching } =
    useListRecipesLimitQuery({
      page: page,
      limit: 6,
    })

  const { isAuth } = useAuth()

  return (
    <>
      <Box py="2">
        <Heading size="xl">My Recipes</Heading>

        <Box>
          {error && <p>An error occured</p>}
          {/* {isLoading && <p>Loading...</p>} */}
        </Box>
        {isFetching && (
          <Stack padding={4} spacing="23px">
            <Skeleton width="100%" height="82px" isLoaded={false} />
            <Skeleton width="100%" height="82px" isLoaded={false} />
          </Stack>
        )}

        {isSuccess && !isFetching && (
          <Box>
            <SimpleCardList items={data?.items} />
            {isAuth && <CardAdd to={'/recipes/new'} name="Recipe" />}
          </Box>
        )}

        <Box pt={4}>
          <Pagination
            setPage={setPage}
            page={page}
            totalPage={data?.meta.totalPages}
            isFetching={isFetching}
          />
        </Box>
      </Box>
    </>
  )
}

export default Recipes
