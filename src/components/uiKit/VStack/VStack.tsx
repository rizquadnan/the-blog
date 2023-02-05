import { StackProps, VStack as _VStack } from '@chakra-ui/layout'
import React from 'react'

export type TVStack = StackProps
export function VStack(props: TVStack) {
  return <_VStack alignItems="stretch" {...props} />
}

export default VStack
