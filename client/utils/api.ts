import axios from 'axios'

let serverURL = 'http://localhost:8000'

export default axios.create({
  baseURL: serverURL,
})
