import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control'
import React from 'react'
import { useForm } from 'react-hook-form'
import { VStack } from '@/components/uiKit/VStack'

type TFormValues = {
  email: string
  password: string
}
type TLoginForm = {
  onSubmit: (props: TFormValues) => void
}

export function LoginForm(props: TLoginForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>()

  return (
    <VStack as="form" minW="280px">
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel>Email</FormLabel>
        <Input
          {...register('email', { required: 'Email address is required' })}
          placeholder="Email"
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel>Password</FormLabel>
        <Input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          placeholder="Password"
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button
        w="100%"
        mt="48px !important"
        onClick={handleSubmit(props.onSubmit)}
      >
        Submit
      </Button>
    </VStack>
  )
}

export default LoginForm
