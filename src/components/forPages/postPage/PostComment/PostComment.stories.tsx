import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { PostComment } from './PostComment'
import { MOCK_COMMENTS } from '@/mocks/comments'

type TPostComment = React.ComponentProps<typeof PostComment>
export default {
  title: 'Data Display/PostComment',
  component: PostComment,
  parameters: {
    layout: 'centered',
  },
} as Meta<TPostComment>

const Template: Story<TPostComment> = (args) => <PostComment {...args} />

const requiredProps: TPostComment = {
  author: {
    name: MOCK_COMMENTS[0].name,
    email: MOCK_COMMENTS[0].email,
  },
  content: MOCK_COMMENTS[0].body,
}
export const Default = Template.bind({})
Default.args = requiredProps

export const Loading = Template.bind({})
Loading.args = {
  ...requiredProps,
  isLoading: true,
}
