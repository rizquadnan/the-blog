import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { Bottombar } from './Bottombar'
import { Box } from '@chakra-ui/react'
import { action } from '@storybook/addon-actions'

type TBottombar = React.ComponentProps<typeof Bottombar>
export default {
  title: 'Layout/Bottombar',
  component: Bottombar,
} as Meta<TBottombar>

const Template: Story<TBottombar> = (args) => (
  <Box position="fixed" bottom={0} left={0} right={0}>
    <Bottombar {...args} />
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  selectedNav: 'post',
  onLogout: action('logout'),
}
