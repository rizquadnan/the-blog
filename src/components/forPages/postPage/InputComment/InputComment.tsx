import { SendIcon } from '@/components/uiKit/Icons'
import { Box, IconButton, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'

type TInputComment = {
  onSubmit(value: string): void
  isDisabled?: boolean
}

export function InputComment(props: TInputComment) {
  const [value, setValue] = useState('')

  return (
    <Box position="relative">
      <Textarea
        value={value}
        placeholder="Add comment"
        onChange={(e) => setValue(e.target.value)}
        paddingRight="60px !important"
        isDisabled={props.isDisabled}
      />
      <IconButton
        position="absolute"
        top="50%"
        right="12px"
        transform="translateY(-50%)"
        opacity={value ? 1 : 0}
        transition="opacity 250ms"
        onClick={() => props.onSubmit(value)}
        variant="ghost"
        aria-label="Submit"
        colorScheme="orange"
        icon={<SendIcon />}
        zIndex={2}
      />
    </Box>
  )
}

export default InputComment
