import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { InputComment } from './InputComment'
import { action } from '@storybook/addon-actions'

type TInputComment = React.ComponentProps<typeof InputComment>
export default {
  title: 'User Inputs/InputComment',
  component: InputComment,
} as Meta<TInputComment>

const Template: Story<TInputComment> = (args) => <InputComment {...args} />

export const Default = Template.bind({})
Default.args = {
  onSubmit: action('Submit!'),
}
