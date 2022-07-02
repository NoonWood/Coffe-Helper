import React, { FC, useState } from 'react'
import { Flex, Text, IconButton, Divider } from '@chakra-ui/react'
import { FiMenu, FiHome, FiGrid, FiUser, FiSettings } from 'react-icons/fi'

import NavItem from './NavItem/NavItem'

const Sidebar: FC = () => {
  const [navSize, changeNavSize] = useState<'large' | 'small'>('large')
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      marginRight="10px"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize === 'small' ? '15px' : '30px'}
      w={navSize === 'small' ? '75px' : '200px'}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <IconButton
          aria-label="Navbar"
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            navSize === 'small'
              ? changeNavSize('large')
              : changeNavSize('small')
          }}
        />
        <NavItem navSize={navSize} icon={FiHome} title="Home" route="/" />
        <NavItem
          navSize={navSize}
          icon={FiGrid}
          title="Sections"
          route="/sections"
        />
        <NavItem
          navSize={navSize}
          icon={FiUser}
          title="MyRecipes"
          route="/recipes"
        />
        <NavItem
          navSize={navSize}
          icon={FiSettings}
          title="Settings"
          route="/settings"
        />
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize === 'small' ? 'none' : 'flex'} />
        <Flex display={navSize === 'small' ? 'none' : 'flex'}>
          <Text>Sidebar</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Sidebar
