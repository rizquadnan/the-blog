import React, { ReactNode } from 'react'
import { ColorModeToggle } from '../ColorModeToggle'

type TPage = {
  children: ReactNode
}
function Page(props: TPage) {
  return (
    <>
      <ColorModeToggle />
      {props.children}
    </>
  )
}

export default Page