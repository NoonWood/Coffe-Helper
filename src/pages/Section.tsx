import React, { FC } from 'react'
import { Heading, Box } from '@chakra-ui/react'
import SimpleCardList from '../components/SimpleCard/SimpleCardList'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks/hooksRedux'

import CardAdd from '../components/CardAdd/CardAdd'

const Section: FC = () => {
  const { name } = useParams()
  const sections = useAppSelector((state) => state.section)

  const thisSection = sections.find((section) => section.name === name)
  const recipes = useAppSelector((state) => state.recipe)

  if (thisSection === undefined) {
    return null
  }
  const recipeInSection = recipes.filter(
    (recipe) => recipe.section === thisSection.name
  )

  return (
    <>
      <Box py="2">
        {sections && (
          <>
            <Heading size="xl">{name}</Heading>
            <SimpleCardList items={recipeInSection} />
            <CardAdd to={'/recipes/new'} name="Recipe" />
          </>
        )}
      </Box>
    </>
  )
}

export default Section
