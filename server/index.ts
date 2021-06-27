import express, { Request, Response } from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/public/index.html')
})

const mongoURLstring = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x3hwc.mongodb.net/focus?retryWrites=true&w=majority`

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
