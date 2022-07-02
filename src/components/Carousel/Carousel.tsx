import React, { FC } from 'react'
import { Container } from '@chakra-ui/react'
import ChakraCarousel from './ChakraCarousel/ChakraCarousel'
import { Section } from '../../stor/slices/sectionSlice'
import { Recipe } from '../../stor/slices/recipeSlice'
import CardItem from '../CardList/CardItem'

interface CaruselProps {
  cards: Section[] | Recipe[]
}

const Carusel: FC<CaruselProps> = ({ cards }) => {
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
