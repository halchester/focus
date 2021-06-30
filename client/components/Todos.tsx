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
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const Todos = () => {
  const [date, setDate] = React.useState(new Date())
  const [todo, setTodo] = React.useState('')

  const handleDateChange = (date: any) => {
    // let dueDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    setDate(date)
  }

  const addTodo = () => {
    const payload = {
      todo,
      dueDate: date.toString(),
      done: false,
      uniqueId: `${Math.random()}`,
    }
    todos.push(payload)
    setTodo('')
    setDate(new Date())
  }

  return (
    <Box m="2">
      <Text fontSize="lg" align="center" mb="2" fontWeight="semibold">
        Todos
      </Text>
      {todos.map((todo, idx) => (
        <Stack key={idx} spacing="2" my="1">
          <Todo todo={todo} />
        </Stack>
      ))}
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
                selected={date}
              />
            </Box>
            <Button onClick={addTodo}>Add todo</Button>
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
          {!todo.done ? (
            <IconButton
              onClick={() => {
                console.log(todo.uniqueId)
              }}
              borderRadius="md"
              size="sm"
              aria-label="toggleTodo"
              icon={<CheckIcon />}
            />
          ) : null}
        </Box>
      </Flex>
    </Box>
  )
}
