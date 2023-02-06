import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { PostForm } from './PostForm'

type TPostForm = React.ComponentProps<typeof PostForm>
export default {
  title: 'User Inputs/PostForm',
  component: PostForm,
} as Meta<TPostForm>

const Template: Story<TPostForm> = (args) => <PostForm {...args} />

export const CreateVariant = Template.bind({})
CreateVariant.args = {
  author: String(271030),
  variant: 'create',
}

export const UpdateVariant = Template.bind({})
UpdateVariant.args = {
  variant: 'update',
  initialValues: {
    body: 'Some Body',
    title: 'Some Title',
    post: String(241232),
  },
}
