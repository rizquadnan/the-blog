import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { LoginSwitch } from './LoginSwitch'

type TLoginSwitch = React.ComponentProps<typeof LoginSwitch>
export default {
  title: 'User Inputs/LoginSwitch',
  component: LoginSwitch,
} as Meta<TLoginSwitch>

const Template: Story<TLoginSwitch> = (args) => <LoginSwitch {...args} />

export const Default = Template.bind({})
