let todos = [
  {
    uniqueId: '1',
    todo: 'eat shit',
    dueDate: '',
    done: false,
  },
  {
    uniqueId: '2',
    todo: 'eat shit',
    dueDate: '203.232332,23',
    done: false,
  },
  {
    uniqueId: '3',
    todo: 'eat shit',
    dueDate: '',
    done: false,
  },
  {
    uniqueId: '4',
    todo: 'eat shit',
    dueDate: '23.2342',
    done: false,
  },
]

import React from 'react'
import {
  Box,
  Text,
  HStack,
  Stack,
  VStack,
  Icon,
  IconButton,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  CircularProgress,
} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import useAuth from '../store/useAuth'
import { useMutation, useQuery } from 'react-query'
import { addNewTodo, getAllTodos } from '../utils/query'

export const Todos = () => {
  const [dueDate, setDueDate] = React.useState(new Date())
  const [todo, setTodo] = React.useState('')
  const userInfo = useAuth((state: any) => state.userInfo)
  const { data, isLoading, isError, refetch } = useQuery(['todos', userInfo], getAllTodos)
  const { mutate } = useMutation(addNewTodo, {
    onSuccess: () => {
      refetch()
    },
    onError: (err) => {
      console.log(err)
    },
    onSettled: () => {
      refetch()
    },
  })

  // console.log(data, isLoading)

  const handleDateChange = (date: any) => {
    // let dueDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
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
        <CircularProgress />
      ) : (
        data.todos.map((todo: any, idx: number) => (
          <Stack key={idx} spacing="2" my="1">
            <Todo todo={todo} />
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
}

const Todo = ({ todo }: ITodoProp) => {
  return (
    <Box bg="gray.200" p="2" borderRadius="md">
      <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="md">{todo.todo}</Text>
          <Text color="gray.500" fontSize="sm">
            Due date : {todo.dueDate}
          </Text>
        </Box>
        <Box>
          <HStack spacing="2">
            <IconButton
              onClick={() => {
                console.log(todo.uniqueId)
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
                console.log(todo.uniqueId)
              }}
            />
          </HStack>
        </Box>
      </Flex>
    </Box>
  )
}
