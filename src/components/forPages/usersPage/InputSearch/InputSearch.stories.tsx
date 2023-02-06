import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { InputSearch } from './InputSearch'

type TInputSearch = React.ComponentProps<typeof InputSearch>
export default {
  title: 'User Inputs/InputSearch',
  component: InputSearch,
  parameters: {
    a11y: {
      disable: true,
    },
  },
} as Meta<TInputSearch>

const Template: Story<TInputSearch> = (args) => <InputSearch {...args} />

export const Default = Template.bind({})
Default.parameters = {
  a11y: {
    disable: true,
  },
}
