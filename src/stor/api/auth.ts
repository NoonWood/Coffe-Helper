import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setError, setIsLoading, setUser, User } from '../slices/userSlice'

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: User, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const { data } = await axios.post<any>(
        'http://localhost:3003/api/auth/login',
        {
          email: email,
          password: password,
        }
      )
      // .then(function (response) {
      //   console.log(response)
      //   thunkAPI.dispatch(setIsLoading(false))
      // })
      // .catch(function (error) {
      //   console.log(error)
      //   thunkAPI.dispatch(setIsLoading(false))
      // })

      // if (mockUser !== undefined) {
      //   localStorage.setItem('auth', 'true')
      //   localStorage.setItem('token', mockUser?.token ? mockUser.token : '')
      //   thunkAPI.dispatch(setUser(mockUser))

      //   thunkAPI.dispatch(setIsLoading(false))
      //   return { user: mockUser }
      // } else {
      //   thunkAPI.dispatch(setIsLoading(false))
      //   thunkAPI.dispatch(setError('Некорректный логин или пароль !'))
      // }
    } catch (e) {
      thunkAPI.dispatch(setError('Ошибка при лигине !'))
    }
  }
)

const register_ = createAsyncThunk(
  'user/register',
  async ({ email, password }: User, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))

      // postData('http://localhost:3003/api/auth/register', {
      //   email: email,
      //   password: password,
      // }).then((data) => {
      //   console.log(data) // JSON data parsed by `data.json()` call
      // })
      await axios
        .post<any>('/api/auth/register', {
          email: email,
          password: password,
        })
        .then(function (response) {
          thunkAPI.dispatch(setIsLoading(false))
          console.log(response)
          if (response.status === 201) {
            const navigate = useNavigate()
            navigate('/login')
          }
        })
        .catch(function (error) {
          console.log(error)
          thunkAPI.dispatch(setIsLoading(false))
          if (error.status === 409) {
            thunkAPI.dispatch(
              setError('Пользователь с таким email уже существует')
            )
          }
          if (error.status === 400) {
            thunkAPI.dispatch(setError('Пароль длиной менне 8 символов'))
          }
        })
    } catch (e) {
      thunkAPI.dispatch(setError('Ошибка при лигине !'))
    }
  }
)

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
