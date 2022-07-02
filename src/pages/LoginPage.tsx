import React, { FC, useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import LoginForm from '../components/LoginForm/LoginForm'
import { login, loginMock, User } from '../stor/slices/userSlice'
// import RegisterForm from '../components/RegisterForm/RegisterForm'
import { useAppDispatch } from '../hooks/hooksRedux'
import useAuth from '../hooks/useAuth'

type LocationProps = {
  state: {
    from: Location
  }
}

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation() as unknown as LocationProps
  // const fromPage = location.state?.from?.pathname || '/'
  let fromPage = location.state !== null ? location?.state?.from.pathname : '/'

  const dispatch = useAppDispatch()
  const { isAuth } = useAuth()

  const handlerSubmit = (user: User) => {
    // console.log(user)
    // dispatch(loginMock(user))
    dispatch(login(user))
  }

  useEffect(() => {
    if (isAuth) {
      navigate(fromPage, { replace: true })
    }
  }, [isAuth])

  return (
    <>
      <Box py="2">
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <LoginForm handlerSubmit={handlerSubmit} />
          <Box>
            New to us? <RouterLink to="/register">Sign Up</RouterLink>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default LoginPage
