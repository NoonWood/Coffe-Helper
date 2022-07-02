import React, { FC } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { LinkBox, LinkOverlay, Text, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface CardAddProps {
  to: string
  name: string
}
const CardAdd: FC<CardAddProps> = ({ to, name }) => {
  return (
    <LinkBox as="article" p={2} borderWidth="1px" rounded="md" maxW={'330px'}>
      <Heading size="md" my="2">
        <AddIcon w={6} h={6} />
        <LinkOverlay as={Link} to={`${to}`}></LinkOverlay>
      </Heading>
      <Text>Add new {name}</Text>
    </LinkBox>
  )
}

export default CardAdd
