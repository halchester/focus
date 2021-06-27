import mongoose from 'mongoose'
import shortid from 'shortid'

export type TodoDocument = mongoose.Document & {
  todo: string
  dueDate: string
  done: boolean
  uniqueId: string
}

const TodoSchema = new mongoose.Schema<TodoDocument>({
  todo: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
  },
  done: {
    type: Boolean,
    default: false,
  },
  uniqueId: {
    type: String,
  },
})

TodoSchema.pre('save', async (next) => {
  const todo = this as TodoDocument
  todo.uniqueId = shortid.generate()
  next()
})

const Todo = mongoose.model<TodoDocument>('Todo', TodoSchema)

export default Todo
