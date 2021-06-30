import express, { Request, Response } from 'express'
import session from 'express-session'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import MongoStore from 'connect-mongo'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
const mongoURLstring = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x3hwc.mongodb.net/focus?retryWrites=true&w=majority`

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET!,
    store: new MongoStore({
      mongoUrl: mongoURLstring,
      mongoOptions: {
        autoReconnect: true,
      },
    }),
  })
)

// Routers import
import authRouter from './app/routers/auth.route'
import todoRouter from './app/routers/todo.route'
app.use('/api', authRouter)
app.use('/api', todoRouter)

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/public/index.html')
})

mongoose
  .connect(mongoURLstring, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected!')
    app.listen(PORT, () => {
      console.log(`Server up and running at port : ${PORT}`)
    })
  })
  .catch((err) => console.log(err))
