import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { UserForm } from './UserForm'

type TUserForm = React.ComponentProps<typeof UserForm>
export default {
  title: 'User Inputs/UserForm',
  component: UserForm,
} as Meta<TUserForm>

const Template: Story<TUserForm> = (args) => <UserForm {...args} />

export const Create = Template.bind({})
Create.args = {
  variant: 'create',
}

export const Update = Template.bind({})
Update.args = {
  variant: 'update',
  initialValues: {
    email: 'Some email',
    gender: 'female',
    status: 'active',
    name: 'Some name',
  },
}
