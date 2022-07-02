import React, { FC } from 'react'
import { Flex, Text, Icon, Link } from '@chakra-ui/react'

import { Link as RouterLink, useMatch } from 'react-router-dom'
import { IconType } from 'react-icons'

interface NavItemProps {
  navSize: 'large' | 'small'
  title: string
  icon: IconType
  route: string
}

const NavItem: FC<NavItemProps> = ({ navSize, title, icon, route }) => {
  const active = !!useMatch(route)

  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
    >
      <Link
        as={RouterLink}
        to={route}
        backgroundColor={active ? '#aec8ca' : undefined}
        p={3}
        borderRadius={8}
        _hover={{ textDecor: 'none', backgroundColor: '#aec8ca' }}
        w={navSize === 'large' ? '100%' : 'none'}
      >
        <Flex>
          <Icon
            as={icon}
            fontSize="xl"
            color={active ? '82AAAD' : 'gray.500'}
          />
          <Text ml={5} display={navSize === 'small' ? 'none' : 'flex'}>
            {title}
          </Text>
        </Flex>
      </Link>
    </Flex>
  )
}

export default NavItem
