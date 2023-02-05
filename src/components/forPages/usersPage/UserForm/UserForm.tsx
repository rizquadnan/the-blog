import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { VStack } from '@/components/uiKit/VStack'
import { HStack, Radio, RadioGroup } from '@chakra-ui/react'

type TFormValues = {
  name: string
  gender: 'male' | 'female'
  email: string
  status: 'active' | 'inactive'
}
type TUserFormCreate = {
  variant: 'create'
  onSubmit: (props: TFormValues) => void
}
type TUserFormUpdate = {
  variant: 'update'
  initialValues: TFormValues
  onSubmit: (props: TFormValues) => void
}

export function UserForm(props: TUserFormCreate | TUserFormUpdate) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm<TFormValues>({
    defaultValues:
      props.variant === 'update'
        ? props.initialValues
        : { email: '', gender: 'male', name: '', status: 'inactive' },
  })

  const notEligbleToUpdate = props.variant === 'update' && !isDirty

  return (
    <VStack as="form" minW="280px">
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel>Email</FormLabel>
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          placeholder="Email"
          type="email"
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel>Name</FormLabel>
        <Input
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          })}
          placeholder="Name"
        />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>

      <Controller
        name="gender"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl as="fieldset">
            <FormLabel as="legend">Gender</FormLabel>
            <RadioGroup onChange={onChange} value={value}>
              <HStack spacing="4px">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl as="fieldset">
            <FormLabel as="legend">Status</FormLabel>
            <RadioGroup onChange={onChange} value={value}>
              <HStack spacing="4px">
                <Radio value="active">Active</Radio>
                <Radio value="inactive">Inactive</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        )}
      />

      <Button
        w="100%"
        mt="48px !important"
        onClick={handleSubmit(props.onSubmit)}
        isDisabled={notEligbleToUpdate}
      >
        Submit
      </Button>
    </VStack>
  )
}

export default UserForm
