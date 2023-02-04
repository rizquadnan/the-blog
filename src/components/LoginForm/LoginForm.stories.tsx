import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { LoginForm } from './LoginForm'

type TLoginForm = React.ComponentProps<typeof LoginForm>
export default {
  title: 'UserInputs/LoginForm',
  component: LoginForm,
} as Meta<TLoginForm>

const Template: Story<TLoginForm> = (args) => <LoginForm {...args} />

export const Default = Template.bind({})
