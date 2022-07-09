import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import recipeReducer from './slices/recipeSlice'
import sectionReducer from './slices/sectionSlice'

import { setupListeners } from '@reduxjs/toolkit/query/react'
import { recipeApi } from './api/recipeApi'
import { sectionApi } from './api/sectionApi'

const store = configureStore({
  reducer: {
    section: sectionReducer,
    recipe: recipeReducer,
    user: userReducer,

    [recipeApi.reducerPath]: recipeApi.reducer,
    [sectionApi.reducerPath]: sectionApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware, sectionApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
