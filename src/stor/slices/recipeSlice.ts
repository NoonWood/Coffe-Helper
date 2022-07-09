import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface RecipeStep {
  text: string
  radio?: 'timer' | 'option'
  id: string
  timer: {
    minutes: number
    seconds: number
  } | null
}
interface Recipe {
  name: string
  description: string
  section: string
  grams: string
  id: string
  recipeSteps: RecipeStep[]
  image?: string
}

const initialState: Recipe[] = [
  {
    name: 'Пуэр',
    description: 'Чай постферментированный',
    section: 'Чай',
    grams: '15',
    id: '1',
    recipeSteps: [
      {
        text: 'Промыть',

        id: '1',
        radio: 'option',
        timer: null,
      },
      {
        text: 'Залить',
        id: '2',
        radio: 'option',
        timer: null,
      },
      {
        text: 'Экстракция 5-8 минут',
        radio: 'timer',
        timer: {
          minutes: 5,
          seconds: 0,
        },
        id: '3',
      },
      {
        text: 'Не продавливать поршень, а просто пролить через его сито',

        id: '4',
        radio: 'option',
        timer: null,
      },
    ],
  },
  {
    name: 'Рецепт Френч пресса',
    description: 'Простой рецепт приготовления кофе от Хофманна',
    section: 'Кофе',
    grams: '60',
    id: '2',
    recipeSteps: [
      {
        text: 'Залить на 4 минуты',

        id: '1',
        radio: 'option',
        timer: null,
      },
      {
        text: 'Разбить шапку, что не утануло - выловить',

        id: '2',
        radio: 'option',
        timer: null,
      },
      {
        text: 'Экстракция 5-8 минут',

        radio: 'timer',
        timer: {
          minutes: 5,
          seconds: 0,
        },
        id: '3',
      },
      {
        text: 'Не продавливать поршень, а просто пролить через его сито',

        id: '4',
        radio: 'option',
        timer: null,
      },
    ],
  },
]

// export const getRecipes = createAsyncThunk(
//   'recipe/getRecipes',
//   async (_, { rejectWithValue, dispatch }) => {
//     const res = await axios.get('')
//     dispatch(setRecipesAction(res.data))
//   }
// )

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setRecipesAction(state, action: PayloadAction<Recipe[]>) {
      return action.payload
    },
    addRecipeAction(state, action: PayloadAction<Recipe>) {
      state.push(action.payload)
    },
    editRecipeAction(state, action: PayloadAction<Recipe>) {
      const targetElement = state?.find(
        (recipe) => recipe.id === action.payload.id
      )
      if (targetElement !== undefined) {
        const targetIndex = state.indexOf(targetElement)
        const editedTarget = action.payload
        state.splice(targetIndex, 1, editedTarget)
      }
    },
    removeRecipeAction(state, action: PayloadAction<Recipe>) {
      return state.filter((recipe) => recipe.id !== action.payload.id)
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(getRecipes.fulfilled, (state, action) => {
  //     console.log('fulfilled')
  //   })
  //   builder.addCase(getRecipes.pending, (state, action) => {
  //     console.log('panding')
  //   })
  //   builder.addCase(getRecipes.rejected, (state, action) => {
  //     console.log('rejected')
  //   })
  // },

  // extraReducers: {
  //   [getRecipes.fulfilled]: () => console.log('fulfilled'),
  //   [getRecipes.pending]: () => console.log('panding'),
  //   [getRecipes.rejected]: () => console.log('rejected'),
  // },
})

export const {
  addRecipeAction,
  editRecipeAction,
  removeRecipeAction,
  setRecipesAction,
} = recipeSlice.actions

export default recipeSlice.reducer

export type { Recipe, RecipeStep }
