import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { TableLoadingItem } from './TableLoadingItem'
import { Table, Tbody, Th, Thead } from '@chakra-ui/react'

type TTableLoadingItem = React.ComponentProps<typeof TableLoadingItem>
export default {
  title: 'Feedback/TableLoadingItem',
  component: TableLoadingItem,
} as Meta<TTableLoadingItem>

const Template: Story<TTableLoadingItem> = () => (
  <Table variant="striped">
    <Thead>
      <Th>1</Th>
      <Th>2</Th>
      <Th>3</Th>
      <Th>4</Th>
      <Th>5</Th>
      <Th>6</Th>
    </Thead>
    <Tbody>
      <TableLoadingItem />
    </Tbody>
  </Table>
)

export const Default = Template.bind({})
