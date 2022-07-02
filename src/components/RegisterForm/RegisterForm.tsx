import React, { FC, useState } from 'react'
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
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { User } from '../../stor/slices/userSlice'
import { FaLock, FaUserAlt } from 'react-icons/fa'

interface RegisterFormProps {
  handlerSubmit: (user: User) => void
}

interface SubmitProps {
  email: string | null
  password: string | null
  confirmPassword: string | null
}

const RegisterForm: FC<RegisterFormProps> = ({ handlerSubmit }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const handleShowClick = () => setShowPassword(!showPassword)
  const handleShowConfirmClick = () =>
    setShowPasswordConfirm(!showPasswordConfirm)

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubmitProps>(formOptions)

  const onSubmit: SubmitHandler<SubmitProps> = (values) => {
    let user: User = {
      email: null,
      password: null,
      token: null,
      id: null,
    }
    if (values) {
      user.email = values.email
      user.password = values.password

      handlerSubmit(user)
    }
  }

  return (
    <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
      <Avatar bg="teal.500" />
      <Heading>Welcome</Heading>
      <Box minW={{ base: '90%', md: '468px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} p="1rem" boxShadow="md">
            <FormControl isInvalid={!!errors.email}>
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
              <FormErrorMessage>
                {errors?.email && errors?.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
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
                  {...register('password', {
                    required: true,
                    minLength: 5,
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormErrorMessage>
                {errors?.password && errors?.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<FaLock color="gray.300" />}
                />
                <Input
                  type={showPasswordConfirm ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  required
                  {...register('confirmPassword', {
                    required: true,
                    minLength: 5,
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowConfirmClick}
                  >
                    {showPasswordConfirm ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormErrorMessage>
                {errors?.confirmPassword && errors?.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              isLoading={isSubmitting}
            >
              Register
            </Button>

            <Button
              borderRadius={0}
              type="button"
              variant="outline"
              colorScheme="teal"
              width="full"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  )
}

export default RegisterForm
