import React from 'react'
import {
  Box,
  Text,
  HStack,
  Stack,
  IconButton,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  CircularProgress,
  useToast,
} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useAuth from '../store/useAuth'
import { useMutation, useQuery } from 'react-query'
import { addNewTodo, getAllTodos } from '../utils/query'
import moment from 'moment'
import axios from '../utils/api'

export const Todos = () => {
  const [dueDate, setDueDate] = React.useState(new Date())
  const [todo, setTodo] = React.useState('')
  const toast = useToast()
  const userInfo = useAuth((state: any) => state.userInfo)
  const { data, isLoading, isError, refetch } = useQuery(['todos', userInfo], getAllTodos)
  const { mutate } = useMutation(addNewTodo, {
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
    },
    onError: () => {
      toast({
        title: 'Oh no! Something went wrong :(',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
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
        <CircularProgress isIndeterminate color="green.300" />
      ) : (
        data.todos.map((todo: any, idx: number) => (
          <Stack key={idx} spacing="2" my="1">
            <Todo todo={todo} refetch={refetch} />
          </Stack>
        ))
      )}
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
            <Button
              onClick={() => {
                const payload = { userUniqueId: userInfo.uniqueId, todo, dueDate }
                mutate(payload)
              }}
            >
              Add todo
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Box>
  )
}

interface ITodo {
  todo: string
  dueDate: Date | string
  done: boolean
  uniqueId: string
}
interface ITodoProp {
  todo: ITodo
  refetch: () => void
}

const Todo = ({ todo, refetch }: ITodoProp) => {
  const toggleTodoDone = (uniqueId: string, payload: ITodo) => {
    axios
      .put(`/api/todo/${uniqueId}`, payload)
      .then(() => {
        refetch()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteTodo = (uniqueId: string) => {
    axios
      .delete(`/api/todo/${uniqueId}`)
      .then(() => {
        refetch()
      })
      .catch((err) => console.log(err))
  }

  return (
    <Box bg={todo.done ? 'green.200' : 'gray.200'} p="2" borderRadius="md">
      <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="md" textDecoration={todo.done ? 'line-through' : ''}>
            {todo.todo}
          </Text>
          <Text color="gray.500" fontSize="sm">
            Due date : <strong>{moment(todo.dueDate).format('DD-MM-YYYY')}</strong>
          </Text>
        </Box>
        <Box>
          <HStack spacing="2">
            <IconButton
              onClick={() => {
                toggleTodoDone(todo.uniqueId, {
                  ...todo,
                  done: !todo.done,
                })
              }}
              borderRadius="md"
              size="sm"
              aria-label="toggleTodo"
              icon={<CheckIcon />}
            />
            <IconButton
              borderRadius="md"
              size="sm"
              aria-label="deleteTodo"
              icon={<DeleteIcon />}
              onClick={() => {
                deleteTodo(todo.uniqueId)
              }}
            />
          </HStack>
        </Box>
      </Flex>
    </Box>
  )
}
