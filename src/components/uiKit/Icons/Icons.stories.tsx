import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { Icons } from './Icons'

type TIcons = React.ComponentProps<typeof Icons>
export default {
  title: 'DataDisplay/Icons',
  component: Icons,
} as Meta<TIcons>

const Template: Story<TIcons> = () => <Icons />

export const AllIcons = Template.bind({})
