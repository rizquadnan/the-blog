import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { PostForm } from './PostForm'

type TPostForm = React.ComponentProps<typeof PostForm>
export default {
  title: 'User Inputs/PostForm',
  component: PostForm,
} as Meta<TPostForm>

const Template: Story<TPostForm> = (args) => <PostForm {...args} />

export const Default = Template.bind({})
Default.args = {
  author: String(271030),
}
