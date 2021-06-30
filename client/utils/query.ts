import { Query, QueryClient, QueryKey } from 'react-query'
import axios from './api'

export const queryClient = new QueryClient()

export const getAllTodos = async ({ queryKey }: any) => {
  const response = await axios.get(`/api/todos/${queryKey[1].uniqueId}`)
  return response.data.data
}

export const addNewTodo = async (payload: any) => {
  const response = await axios.post(`/api/todo/add`, payload)
  return response.data.data
}
