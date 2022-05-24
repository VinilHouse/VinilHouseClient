import axios from 'axios'

export default axios.create({
  baseURL: 'http://vinilhouse.ga/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
