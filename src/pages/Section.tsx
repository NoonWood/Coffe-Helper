import React, { FC, useEffect, useState } from 'react'
import { Heading, Box } from '@chakra-ui/react'
import SimpleCardList from '../components/SimpleCard/SimpleCardList'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks/hooksRedux'

import CardAdd from '../components/CardAdd/CardAdd'
import { useGetRecipeBySectionQuery } from '../stor/api/recipeApi'
import useAuth from '../hooks/useAuth'

const Section: FC = () => {
  const { name = '' } = useParams()
  const { isAuth } = useAuth()

  const {
    data: recipes,
    error: error,
    isLoading: isLoading,
    isSuccess: isSuccess,
    isFetching: isFetching,
  } = useGetRecipeBySectionQuery(name)

  if (isSuccess && recipes.length === 0) {
    return (
      <>
        <Box py="2">
          <Heading size="xl">The "{name}" section is empty</Heading>
          <Box py=" 4">
            {isAuth && (
              <CardAdd to={`/recipes/new?name=${name}`} name="Recipe" />
            )}
          </Box>
        </Box>
      </>
    )
  }

  return (
    <>
      <Box py="2">
        {isSuccess && (
          <>
            <Heading size="xl">{name}</Heading>
            <SimpleCardList items={recipes} />
            {isAuth && (
              <CardAdd to={`/recipes/new?name=${name}`} name="Recipe" />
            )}
          </>
        )}
      </Box>
    </>
  )
}

export default Section
