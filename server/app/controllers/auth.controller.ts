import User from '../models/user.model'
import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, fullname } = req.body

  try {
    const user = await User.findOne({ username })
    if (user)
      return res.status(400).json({ success: false, data: user, error: 'User already exists!' })

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({ fullname, username, password: hashedPassword })

    const response = await newUser.save()
    if (response) return res.status(200).json({ success: true, data: response, error: null })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ success: false, data: {}, error: 'Something went wrong!' })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Username or password is wrong!',
        data: {},
      })
    }

    const passwordIsValid = await bcryptjs.compare(password, user.password)
    if (!passwordIsValid) {
      return res.status(400).json({ success: false, error: 'Invalid password', data: {} })
    }

    let token = jwt.sign(
      { credentials: `${user.uniqueId}.${user.username}` },
      process.env.JWT_SECRET!,
      {}
    )

    const credentials = {
      uniqueId: user.uniqueId,
      username: user.username,
      token,
    }

    return res.status(200).json({ success: true, data: credentials, error: null })
  } catch (err) {
    return res.status(401).json({ success: false, data: 'Username or password is incorrect' })
  }
}
