import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { ColorModeToggle } from './ColorModeToggle'

type TColorModeToggle = React.ComponentProps<typeof ColorModeToggle>
export default {
  title: 'User Inputs/ColorModeToggle',
  component: ColorModeToggle,
} as Meta<TColorModeToggle>

const Template: Story<TColorModeToggle> = () => <ColorModeToggle />

export const Default = Template.bind({})
