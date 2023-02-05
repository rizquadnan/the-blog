import React from 'react'
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link'
import { Link as _Link, LinkProps as _LinkProps } from '@chakra-ui/layout'

type LinkProps = _LinkProps & NextLinkProps
export function Link(props: LinkProps) {
  return <_Link as={NextLink} prefetch={false} {...props} />
}

export default Link
