import React, { FC } from 'react'
import { Container, Flex } from '@chakra-ui/react'

import { Outlet } from 'react-router-dom'

import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Flex>
        <Sidebar />
        <Container maxW="container.lg">
          <Outlet />
        </Container>
      </Flex>
    </>
  )
}

export default Layout
