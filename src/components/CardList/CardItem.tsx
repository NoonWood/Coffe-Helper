import React, { FC, useState, useEffect } from 'react'
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import { Section } from '../../stor/slices/sectionSlice'
import { Recipe } from '../../stor/slices/recipeSlice'

const IMAGE = './img/empty.webp'

interface CardItemProps {
  card: Section | Recipe
}
const CardItem: FC<CardItemProps> = ({ card }) => {
  const [background, setBackground] = useState(card.image)

  useEffect(() => {
    if (card.image) {
      setBackground(card.image)
    } else {
      setBackground(IMAGE)
    }
  }, [])

  return (
    <LinkBox>
      <Center py={5}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          maxH={'180px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Box
            rounded={'lg'}
            mt={-10}
            pos={'relative'}
            height={'130px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${background})`,
              fallbackSrc: `url(${IMAGE})`,
              filter: 'blur(10px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(25px)',
              },
            }}
          >
            <Image
              src={background}
              fallbackSrc={IMAGE}
              rounded={'lg'}
              height={150}
              width={282}
              objectFit={'cover'}
              filter={'brightness(90%)'}
              alt={card.name}
            />
          </Box>
          <Stack pt={1} align={'left'}>
            <Heading
              fontSize={'3xl'}
              fontFamily={'body'}
              fontWeight={500}
              marginTop={'18px'}
              marginLeft={'20px'}
              textAlign="left"
              zIndex="1"
            >
              <LinkOverlay as={Link} to={`/sections/${card.name}`}>
                {card.name}
              </LinkOverlay>
            </Heading>
          </Stack>
        </Box>
      </Center>
    </LinkBox>
  )
}

export default CardItem
