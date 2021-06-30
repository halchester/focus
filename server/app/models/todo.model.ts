import mongoose from 'mongoose'
import * as shortid from 'shortid'

export type TodoDocument = {
  readonly todo: string
  readonly dueDate: string
  readonly done: boolean
  uniqueId: string
} & mongoose.Document

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  done: {
    type: Boolean,
    required: true,
  },
  uniqueId: {
    type: String,
  },
})

TodoSchema.pre<TodoDocument>('save', function (next) {
  let todo = this
  if (!todo.uniqueId) {
    todo.uniqueId = shortid.generate()
  }
  next()
})

const Todo = mongoose.model<TodoDocument>('Todo', TodoSchema)

export default Todo
