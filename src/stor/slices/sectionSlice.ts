import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Section {
  name: string
  id: string
  description: string
  parentKey?: string
  image?: string
}

const initialState: Section[] = [
  {
    name: 'Чай',
    id: '1',
    description: 'Рецепты чаев',
    parentKey: '1',
    image: './img/tee.jpg',
  },
  {
    name: 'Кофе',
    id: '2',
    description: 'Рецепты кофе',
    parentKey: '2',
    image: './img/coffee.jpg',
  },
]

const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    addSectionAction(state, action: PayloadAction<Section>) {
      state.push(action.payload)
    },
    removeSectionAction(state, action: PayloadAction<Section>) {
      return state.filter((section) => section.id !== action.payload.id)
    },
  },
})

export const { addSectionAction, removeSectionAction } = sectionSlice.actions
export type { Section }
export default sectionSlice.reducer
