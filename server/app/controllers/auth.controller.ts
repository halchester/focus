import User from '../models/user.model'
import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const user = User.findOne({ username })
    if (user)
      return res.status(400).json({ success: false, data: user, error: 'User already exists!' })

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      password: hashedPassword,
    })

    const response = await newUser.save()
    if (response) return res.status(200).json({ success: true, data: response, error: null })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ success: false, data: {}, error: 'Something went wrong!' })
  }
}

export const loginUser = (req: Request, res: Response) => {}
