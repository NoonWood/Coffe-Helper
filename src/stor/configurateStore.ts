import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import recipeReducer from './slices/recipeSlice'
import sectionReducer from './slices/sectionSlice'

const store = configureStore({
  reducer: {
    section: sectionReducer,
    recipe: recipeReducer,
    user: userReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
