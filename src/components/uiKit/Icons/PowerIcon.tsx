import { Icon, IconProps } from '@chakra-ui/icons'
import React from 'react'

export function PowerIcon(props: IconProps) {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
      />
    </Icon>
  )
}

export default PowerIcon
