import React, { FC } from 'react'
import { Heading, Box } from '@chakra-ui/react'
import { useAppSelector } from '../hooks/hooksRedux'
import SimpleCardList from '../components/SimpleCard/SimpleCardList'
import CardAdd from '../components/CardAdd/CardAdd'
import useAuth from '../hooks/useAuth'

const Recipes: FC = () => {
  const recipes = useAppSelector((state) => state.recipe)

  const { isAuth } = useAuth()
  return (
    <>
      <Box py="2">
        <Heading size="xl">My Recipe Sections</Heading>
        <SimpleCardList items={recipes} />
        {isAuth && <CardAdd to={'/recipes/new'} name="My recipe" />}
      </Box>
    </>
  )
}

export default Recipes
