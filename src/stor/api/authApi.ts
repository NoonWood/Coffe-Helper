import axios from 'axios'
import { User } from '../slices/userSlice'

const authAPI = {
  register(user: User) {
    return axios.post<User>('/api/auth/register', {
      email: user.email,
      password: user.password,
    })
  },
  login(user: User) {
    return axios.post<string>('/api/auth/login', {
      email: user.email,
      password: user.password,
    })
  },
}

export { authAPI }
