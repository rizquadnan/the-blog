import {
  Modal as _Modal,
  ModalProps as _ModalProps,
  ModalBody,
  ModalBodyProps,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type ModalProps = Omit<_ModalProps, 'children'> & {
  body: ReactNode
  title: string
  bodyContainerProps?: ModalBodyProps
  footer?: ReactNode
}

export function Modal({ bodyContainerProps = {}, ...props }: ModalProps) {
  return (
    <_Modal size={{ base: 'full', xl: '3xl' }} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="32px" fontWeight={800} color="orange.600">
          {props.title}
        </ModalHeader>
        <ModalCloseButton size="lg" />
        <ModalBody pb="24px" {...bodyContainerProps}>
          {props.body}
        </ModalBody>
        {props.footer !== undefined && (
          <ModalFooter display="block">{props.footer}</ModalFooter>
        )}
      </ModalContent>
    </_Modal>
  )
}

export default Modal
