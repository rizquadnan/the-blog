import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control'
import React from 'react'
import { useForm } from 'react-hook-form'
import { VStack } from '@/components/uiKit/VStack'
import { Text, Textarea } from '@chakra-ui/react'

type TFormValues = {
  title: string
  body: string
}
type TPostFormCreate = {
  variant: 'create'
  author: string
  onSubmit: (props: TFormValues) => void
}
type TPostFormUpdate = {
  variant: 'update'
  initialValues: TFormValues & { post: string }
  onSubmit: (props: TFormValues) => void
}
type TPostForm = (TPostFormCreate | TPostFormUpdate) & {
  author: string
  isSubmitLoading?: boolean
}

export function PostForm(props: TPostForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TFormValues>({
    defaultValues:
      props.variant === 'update'
        ? props.initialValues
        : { body: '', title: '' },
  })

  const notEligbleToUpdate = props.variant === 'update' && !isDirty
  const formTitle =
    props.variant === 'create'
      ? `Creating Post for user: ${props.author}`
      : `Updating Post: ${props.initialValues.post}`

  return (
    <VStack as="form" minW="280px">
      <Text fontSize="18px" fontWeight={600}>
        {formTitle}
      </Text>
      <FormControl isInvalid={Boolean(errors.title)}>
        <FormLabel>Title</FormLabel>
        <Textarea
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
          })}
          placeholder="Title"
        />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.body)}>
        <FormLabel>Body</FormLabel>
        <Textarea
          {...register('body', {
            required: 'Body is required',
            minLength: {
              value: 10,
              message: 'Body must be at least 10 characters',
            },
          })}
          placeholder="Body"
        />
        <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
      </FormControl>
      <Button
        w="100%"
        mt="48px !important"
        isDisabled={notEligbleToUpdate}
        isLoading={props.isSubmitLoading}
        onClick={handleSubmit(props.onSubmit)}
      >
        Submit
      </Button>
    </VStack>
  )
}

export default PostForm
