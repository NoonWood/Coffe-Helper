import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../api/auth'

interface User {
  email: string | null
  password: string | null
  token?: string | null
  id?: string | null

  isLoading?: boolean
  error?: string
}
const initialState: User = {
  email: null,
  password: null,
  token: null,
  id: null,
}

type ErrorResponse = {
  error: string
}

export const registerMock = createAsyncThunk(
  'user/register',
  async ({ email, password }: User, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      setTimeout(
        async () => {
          const res = await axios.get<User[]>('./users.json')
          let json = JSON.stringify(res.data)
          const user = {
            email: email,
            password: password,
          }
          let parsed = JSON.parse(json)
          parsed.push(user)

          console.log(parsed)
          const post = await axios.post('./users.json', parsed, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
        },
        // console.log(res.data)
        1000
      )

      thunkAPI.dispatch(loginMock({ email, password }))
      thunkAPI.dispatch(setIsLoading(false))
    } catch (e) {
      thunkAPI.dispatch(setIsLoading(false))
      thunkAPI.dispatch(setError('Ошибка при лигине !'))
    }
  }
)

export const loginMock = createAsyncThunk(
  'user/login',
  async ({ email, password }: User, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      setTimeout(async () => {
        const res = await axios.get<User[]>('./users.json')
        // console.log(res.data)

        const mockUser = res.data.find(
          (user) => user.email === email && user.password === password
        )

        if (mockUser !== undefined) {
          localStorage.setItem('auth', 'true')
          localStorage.setItem('token', mockUser?.token ? mockUser.token : '')
          thunkAPI.dispatch(setUser(mockUser))

          thunkAPI.dispatch(setIsLoading(false))
          return { user: mockUser }
        } else {
          thunkAPI.dispatch(setIsLoading(false))
          thunkAPI.dispatch(setError('Некорректный логин или пароль !'))
        }
      }, 1000)
    } catch (e) {
      thunkAPI.dispatch(setError('Ошибка при лигине !'))
    }
  }
)

export const logOutMock = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(removeUser())
      localStorage.removeItem('auth')
      localStorage.removeItem('token')
    } catch (e) {
      thunkAPI.dispatch(setError('Ошибка при логауте !'))
    }
  }
)

export const register = createAsyncThunk(
  'user/register',
  async ({ email, password }: User, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const res = await authAPI.register({ email, password })
      if (res.status === 201) {
        const user = res.data
        thunkAPI.dispatch(setUser(user))

        thunkAPI.dispatch(setIsLoading(false))
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log((err.response?.data as ErrorResponse).error)
        thunkAPI.dispatch(setError('Ошибка при логине !'))

        console.log(err)
        thunkAPI.dispatch(setIsLoading(false))
        if (err.response?.status === 409) {
          thunkAPI.dispatch(
            setError('Пользователь с таким email уже существует')
          )
        }
        if (err.response?.status === 400) {
          thunkAPI.dispatch(setError('Пароль длиной менне 8 символов'))
        }
      }
    }
  }
)

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: User, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const res = await authAPI.login({ email, password })
      if (res.status === 201) {
        thunkAPI.dispatch(setIsLoading(false))
        const token = res.data

        thunkAPI.dispatch(setUser({ email, password }))
        localStorage.setItem('auth', 'true')
        localStorage.setItem('token', token)

        return token
      }
    } catch (e) {
      thunkAPI.dispatch(setIsLoading(false))
      thunkAPI.dispatch(setError('Некорректный логин или пароль !'))
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.email = action.payload.email
      state.password = action.payload.password
      state.token = action.payload?.token
      state.id = action.payload.id
      return state
    },
    removeUser(state) {
      state.email = null
      state.password = null
      state.token = null
      state.id = null
    },

    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log('fulfilled')
      console.log(action.payload)
    })
    builder.addCase(login.pending, (state, action) => {
      console.log('panding')
      state.isLoading = true
    })
    builder.addCase(login.rejected, (state, action) => {
      console.log('rejected')
      state.isLoading = false
      state.error = 'Ошибка !!'
    })
    builder.addCase(register.rejected, (state, action) => {
      console.log('rejected')
      state.isLoading = false
      state.error = 'Ошибка регистрации!!'
    })
  },
})

export const { setUser, removeUser, setIsLoading, setError } = userSlice.actions

export default userSlice.reducer

export type { User }
