import axios from 'axios'

// let serverURL = 'http://localhost:8000 '
let serverURL = 'https://focus-study.herokuapp.com/'


export default axios.create({
  baseURL: serverURL,
})
