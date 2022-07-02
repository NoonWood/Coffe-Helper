import React, { FC, useEffect } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { Box, Flex } from '@chakra-ui/react'

import RegisterForm from '../components/RegisterForm/RegisterForm'
import { register, registerMock, User } from '../stor/slices/userSlice'
import { useAppDispatch } from '../hooks/hooksRedux'
import useAuth from '../hooks/useAuth'

const RegisterPage: FC = () => {
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  const dispatch = useAppDispatch()
  const handlerSubmit = (user: User) => {
    // console.log('Register ', user)

    // dispatch(registerMock(user))
    dispatch(register(user))
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/login', { replace: true })
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
          <RegisterForm handlerSubmit={handlerSubmit} />
          <Box>
            Alrady have account? <RouterLink to="/login">Sign In</RouterLink>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default RegisterPage
