import React, { FC } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import CardItem from './CardItem'
import { Section } from '../../stor/slices/sectionSlice'
import { Recipe } from '../../stor/slices/recipeSlice'

interface CardListProps {
  cards: Section[] | Recipe[]
}
const CardList: FC<CardListProps> = ({ cards }) => {
  return (
    <SimpleGrid columns={[1, null, 2, 3]} spacing={[4, null, 5, 6]} py="4">
      {cards.map((card) => (
        <CardItem card={card} key={card.id} />
      ))}
    </SimpleGrid>
  )
}

export default CardList
