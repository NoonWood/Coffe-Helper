import { Box, Heading, Divider } from '@chakra-ui/react'
import { useAppSelector } from '../hooks/hooksRedux'

import Carusel from '../components/Carousel/Carousel'
import SimpleCardList from '../components/SimpleCard/SimpleCardList'

function Home() {
  const recipes = useAppSelector((state) => state.recipe)
  const sections = useAppSelector((state) => state.section)

  return (
    <Box py="2">
      <Carusel cards={sections} />
      <Heading size="xl">Daily best</Heading>
      <Divider />
      <SimpleCardList items={recipes} />
    </Box>
  )
}

export default Home
