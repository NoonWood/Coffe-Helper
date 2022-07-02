import React, { FC } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import SimpleItem from './SimpleItem'
import { Section } from '../../stor/slices/sectionSlice'
import { Recipe } from '../../stor/slices/recipeSlice'

interface SimpleCardListProps {
  items: Section[] | Recipe[]
}
const SimpleCardList: FC<SimpleCardListProps> = ({ items }) => {
  return (
    <SimpleGrid columns={[1, null, 2, 3]} spacing={[4, null, 5, 6]} py="4">
      {items.map((card, index) => (
        <SimpleItem key={card.id} card={card} />
      ))}
    </SimpleGrid>
  )
}

export default SimpleCardList
