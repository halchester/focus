import { Request, Response } from 'express'
import Todo from '../models/todo.model'
import User from '../models/user.model'

export const getAllTodo = async (req: Request, res: Response) => {
  const { uniqueId } = req.params
  try {
    const response = await User.findById({ uniqueId }).populate('todos')
    if (response) {
      return res.status(200).json({ success: true, data: response, error: null })
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({ success: false, data: {}, error: err })
  }
}

export const addNewTodo = async (req: Request, res: Response) => {
  const { todo, dueDate, userUniqueId } = req.body
  const payload = { todo, dueDate, done: false }

  try {
    const newTodo = new Todo(payload)
    const response = newTodo.save()

    const userResponse = await User.updateOne(
      { uniqueId: userUniqueId },
      {
        $push: {
          todos: response,
        },
      }
    )

    if (userResponse) {
      return res.status(200).json({ success: true, data: userResponse, error: null })
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({ success: false, data: {}, error: err })
  }
}

export const deleteNewTodo = async (req: Request, res: Response) => {
  const { uniqueId } = req.params

  try {
    const response = Todo.findByIdAndDelete({ uniqueId })
    if (response) {
      return res.status(200).json({ succcess: true, data: response, error: null })
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({ success: false, data: {}, error: err })
  }
}

export const modifyTodo = async (req: Request, res: Response) => {
  const { uniqueId } = req.params

  try {
    const response = Todo.updateOne(
      { uniqueId },
      {
        $set: { ...req.body },
      },
      {
        new: true,
      }
    )
    if (response) {
      return res.status(200).json({ success: true, data: response, error: null })
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({ success: false, data: {}, error: err })
  }
}
