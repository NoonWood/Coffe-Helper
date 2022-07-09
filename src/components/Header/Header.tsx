import { FC } from 'react'
import {
  Box,
  Flex,
  Image,
  Container,
  useColorMode,
  ButtonGroup,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from '../ColorModeSwitcher/ColorModeSwitcher'
import Login from './Login'
import Logo from '../../logo.svg'

const Header: FC = () => {
  const { colorMode } = useColorMode()

  return (
    <Box
      as="header"
      py={2}
      width="100%"
      bg={colorMode === 'dark' ? 'gray.400' : 'gray.200'}
    >
      <Container maxW="container.lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Image boxSize="50px" objectFit="cover" src={Logo} alt="logo" />
          <ButtonGroup gap="2">
            <ColorModeSwitcher />
            <Login />
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
