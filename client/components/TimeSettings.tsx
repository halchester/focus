import React from 'react'
import { usePomodoro } from '../store/usePomodoro'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Center,
  Input,
  Flex,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'

export const TimeSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const timeSettings = usePomodoro((state: any) => state.timeSettings)
  const setTimeSettings = usePomodoro((state: any) => state.setTimeSettings)
  const [formValues, setFormValues] = React.useState({
    study: 0,
    shortBreak: 0,
    longBreak: 0,
  })

  return (
    <>
      <Center my="4">
        <Button onClick={onOpen} borderRadius="3xl" colorScheme="blue" size="sm">
          Settings
        </Button>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set your desired time settings!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-around" mb="2">
              <Text>
                Study time <strong>(mins)</strong> :{' '}
              </Text>
              <Input
                width="50"
                value={formValues.study}
                type="number"
                onChange={(e: any) => {
                  setFormValues({
                    ...formValues,
                    study: e.target.value,
                  })
                }}
              />
            </Flex>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-around" mb="2">
              <Text>
                Short break <strong>(mins)</strong> :{' '}
              </Text>
              <Input
                width="50"
                value={formValues.shortBreak}
                type="number"
                onChange={(e: any) => {
                  setFormValues({
                    ...formValues,
                    shortBreak: e.target.value,
                  })
                }}
              />
            </Flex>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-around" mb="2">
              <Text>
                Long break <strong>(mins)</strong> :{' '}
              </Text>
              <Input
                width="50"
                value={formValues.longBreak}
                type="number"
                onChange={(e: any) => {
                  setFormValues({
                    ...formValues,
                    longBreak: e.target.value,
                  })
                }}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setTimeSettings()
                toast({
                  title: 'Time settings saved!',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                })
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
