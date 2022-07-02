import React, { FC, useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Avatar,
  Stack,
  Heading,
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormHelperText,
  AlertTitle,
  AlertIcon,
  Alert,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { User } from '../../stor/slices/userSlice'
import { FaLock, FaUserAlt } from 'react-icons/fa'
import { useAppSelector } from '../../hooks/hooksRedux'

interface LoginPageProps {
  handlerSubmit: (user: User) => void
}

const LoginForm: FC<LoginPageProps> = ({ handlerSubmit }) => {
  const { error, isLoading } = useAppSelector((state) => state.user)

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<User> = (values) => {
    if (values) {
      handlerSubmit(values)
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleShowClick = () => setShowPassword(!showPassword)

  return (
    <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
      <Avatar bg="teal.500" />
      <Heading>Welcome</Heading>
      <Box minW={{ base: '90%', md: '468px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} p="1rem" boxShadow="md">
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUserAlt color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  required
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please enter a valid email',
                    },
                  })}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<FaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  {...register('password', { required: true, minLength: 5 })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText textAlign="right">
                <Text>forgot password?</Text>
              </FormHelperText>
            </FormControl>

            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              isLoading={isLoading}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  )
}

export default LoginForm
