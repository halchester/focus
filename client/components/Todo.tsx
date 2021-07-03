import React, { useState } from 'react'
import axios from '../utils/api'
import { Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react'
import moment from 'moment'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'

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

export const Todo = ({ todo, refetch }: ITodoProp): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const toggleTodoDone = (uniqueId: string, payload: ITodo) => {
    setLoading(true)
    axios
      .put(`/api/todo/${uniqueId}`, payload)
      .then(() => {
        setLoading(false)
        refetch()
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const deleteTodo = (uniqueId: string) => {
    setLoading(true)
    axios
      .delete(`/api/todo/${uniqueId}`)
      .then(() => {
        setLoading(false)
        refetch()
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
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
              isLoading={loading}
              icon={<CheckIcon />}
            />
            <IconButton
              borderRadius="md"
              size="sm"
              aria-label="deleteTodo"
              isLoading={loading}
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
