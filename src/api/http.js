import axios from 'axios'

export default axios.create({
  baseURL: 'http://vinilhouse.ga:80/api',
  // baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
