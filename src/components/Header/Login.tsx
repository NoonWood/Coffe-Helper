import React, { FC } from 'react'
import { Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import { useAppDispatch } from '../../hooks/hooksRedux'
import { logOutMock } from '../../stor/slices/userSlice'

const Login: FC = () => {
  const { isAuth } = useAuth()
  const dispatch = useAppDispatch()

  const handlerLogOut = () => {
    dispatch(logOutMock())
  }

  return (
    <>
      {isAuth ? (
        <Button onClick={handlerLogOut}>LogOut</Button>
      ) : (
        <Button as={RouterLink} to="login">
          LogIn
        </Button>
      )}
    </>
  )
}

export default Login
