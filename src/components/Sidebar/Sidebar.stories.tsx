import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Sidebar } from './Sidebar'

type TSidebar = React.ComponentProps<typeof Sidebar>
export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<TSidebar>

const Template: Story<TSidebar> = (args) => <Sidebar {...args} />

export const Default = Template.bind({})
Default.args = {
  selectedNav: 'home',
  onLogout: action('logout'),
}

export const HideUsersNav = Template.bind({})
HideUsersNav.args = {
  hideNav: 'users',
}
