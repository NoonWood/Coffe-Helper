import { FC } from 'react'
import { LinkBox, Heading, Text, LinkOverlay } from '@chakra-ui/react'
import { v4 as uid } from 'uuid'
import { Link } from 'react-router-dom'
import { Section } from '../../stor/slices/sectionSlice'
import { Recipe } from '../../stor/slices/recipeSlice'

interface SimpleItemProps {
  card: Section | Recipe
}

const SimpleItem: FC<SimpleItemProps> = ({ card }) => {
  return (
    <LinkBox
      _hover={{ shadow: 'md' }}
      p={2}
      as="article"
      key={uid()} //{card.id}
      borderWidth="1px"
      rounded="md"
      w="100%"
    >
      <Heading as="h3">
        <LinkOverlay as={Link} to={`/recipes/${card.name}`}>
          {card.name}
        </LinkOverlay>
      </Heading>
      <Text>{card.description}</Text>
    </LinkBox>
  )
}

export default SimpleItem
