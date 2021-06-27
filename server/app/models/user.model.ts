import mongoose from 'mongoose'
import shortid from 'shortid'
import { TodoDocument } from './todo.model'

type UserDocument = mongoose.Document & {
  username: string
  password: string
  todos: TodoDocument[]
  uniqueId: string
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
      },
    ],
    uniqueId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', async (next) => {
  const user = this as UserDocument
  user.uniqueId = shortid.generate()
  next()
})

const User = mongoose.model<UserDocument>('User', UserSchema)

export default User
