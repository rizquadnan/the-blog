import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { Modal } from './Modal'
import { Button, useDisclosure } from '@chakra-ui/react'

type TModal = React.ComponentProps<typeof Modal>
export default {
  title: 'Overlay/Modal',
  component: Modal,
} as Meta<TModal>

const Template: Story<TModal> = (args) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  body: (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cumque.
      Eaque commodi fuga eligendi velit molestiae beatae quibusdam magni, et
      suscipit? Porro facere enim vel ad pariatur. Sed, temporibus praesentium.
    </div>
  ),
  title: 'Modal Title',
}
