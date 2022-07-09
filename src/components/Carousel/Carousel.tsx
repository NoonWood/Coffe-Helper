import React, { FC } from 'react'
import { Container, Skeleton, Stack } from '@chakra-ui/react'
import ChakraCarousel from './ChakraCarousel/ChakraCarousel'
import { Section } from '../../stor/slices/sectionSlice'
import { Recipe } from '../../stor/slices/recipeSlice'
import CardItem from '../CardList/CardItem'

interface CaruselProps<T> {
  // cards: Section[] | Recipe[]
  cards: T[]
}

const Carusel: FC<CaruselProps<Recipe | Section>> = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <Container
        py={8}
        px={0}
        maxW={{
          base: '100%',
          sm: '35rem',
          md: '43.75rem',
          lg: '57.5rem',
          xl: '75rem',
          xxl: '87.5rem',
        }}
      >
        <ChakraCarousel gap={32}>
          <Skeleton p={6} w={'330px'} h={'180px'} isLoaded={false} />
          <Skeleton p={6} w={'330px'} h={'180px'} isLoaded={false} />
        </ChakraCarousel>
      </Container>
    )
  } else
    return (
      <Container
        py={8}
        px={0}
        maxW={{
          base: '100%',
          sm: '35rem',
          md: '43.75rem',
          lg: '57.5rem',
          xl: '75rem',
          xxl: '87.5rem',
        }}
      >
        <ChakraCarousel gap={32}>
          {cards.map((card) => (
            <CardItem card={card} key={card.id} />
          ))}
        </ChakraCarousel>
      </Container>
    )
}

export default Carusel
