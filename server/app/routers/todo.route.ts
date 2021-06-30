import { Router } from 'express'
import { addNewTodo, getAllTodo, modifyTodo, deleteNewTodo } from '../controllers/todo.controller'

const todoRouter = Router()

todoRouter.get('/todos', getAllTodo)
todoRouter.post('/todo/add', addNewTodo)
todoRouter.put('/todo/:uniqueId', modifyTodo)
todoRouter.delete('/todo/:uniqueId', deleteNewTodo)

export default todoRouter
