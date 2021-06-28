import mongoose from 'mongoose'
import * as shortid from 'shortid'
import { TodoDocument } from './todo.model'

type UserDocument = {
  readonly username: string
  readonly password: string
  readonly todos: TodoDocument[]
  uniqueId: string
} & mongoose.Document

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

UserSchema.pre<UserDocument>('save', function (next) {
  const user = this
  if (!user.uniqueId) {
    user.uniqueId = shortid.generate()
  }
  next()
})

const User = mongoose.model<UserDocument>('User', UserSchema)

export default User
