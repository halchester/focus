import React, { useState } from 'react'
import {
  Box,
  Text,
  Stack,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  CircularProgress,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useAuth from '../store/useAuth'
import { useMutation, useQuery } from 'react-query'
import { addNewTodo, getAllTodos } from '../utils/query'
import { Todo } from './Todo'

export const Todos = () => {
  const [dueDate, setDueDate] = React.useState(new Date())
  const [todo, setTodo] = React.useState('')
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const userInfo = useAuth((state: any) => state.userInfo)
  const { data, isLoading, isError, refetch } = useQuery(['todos', userInfo], getAllTodos)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutate } = useMutation(addNewTodo, {
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: () => {
      toast({
        title: 'Todo added!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      refetch()
      setTodo('')
      setDueDate(new Date())
      setLoading(false)
    },
    onError: () => {
      toast({
        title: 'Oh no! Something went wrong :(',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      setLoading(false)
    },
  })

  const handleDateChange = (date: any) => {
    setDueDate(date)
  }

  return (
    <Box m="2">
      <Text fontSize="lg" align="center" mb="2" fontWeight="semibold">
        Todos
      </Text>
      {isError ? (
        <Text>Cannot fetch data :(</Text>
      ) : isLoading ? (
        <CircularProgress isIndeterminate color="green.300" my="2" />
      ) : data.todos.length === 0 ? (
        <Text my="2" align="center" color="gray.700" fontSize="lg">
          You don't have any todos :D
        </Text>
      ) : (
        data.todos.map((todo: any, idx: number) => (
          <Stack key={idx} spacing="4" my="1">
            <Todo todo={todo} refetch={refetch} />
          </Stack>
        ))
      )}
      <Button onClick={onOpen} isFullWidth size="sm" colorScheme="teal">
        Add new Todo!
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new Todo!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my="2">
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Todo</FormLabel>
                  <Input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Enter your todo!"
                  />
                </FormControl>
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <FormLabel>Due Date</FormLabel>
                    <DatePicker
                      onChange={(date) => handleDateChange(date)}
                      placeholderText="Select due date"
                      selected={dueDate}
                    />
                  </Box>
                </Flex>
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                const payload = { userUniqueId: userInfo.uniqueId, todo, dueDate }
                mutate(payload)
              }}
              isLoading={loading}
            >
              Add todo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
