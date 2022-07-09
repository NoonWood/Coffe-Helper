import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Recipe } from '../slices/recipeSlice'

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

interface ListResponse<T> {
  items: T[]
  meta: Meta
}

interface OptionsQuery {
  page: number
  limit?: number
}

// Define a service using a base URL and expected endpoints
export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getRecipes: builder.query<ListResponse<Recipe>, string | void>({
      query: () => '/recipe',
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => `/recipe/${id}`,
    }),
    getRecipeByName: builder.query<Recipe, string>({
      query: (name) => `/recipe/name/${name}`,
    }),
    getRecipeBySection: builder.query<Recipe[], string>({
      query: (section) => `/recipe/section/${section}`,
    }),

    listRecipes: builder.query<ListResponse<Recipe>, number>({
      query: (page) => `/recipe?page=${page}`,
    }),
    listRecipesLimit: builder.query<ListResponse<Recipe>, OptionsQuery>({
      query: ({ page, limit }) => `/recipe?page=${page}&limit=${limit}`,
    }),
    addRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (body) => ({
        url: `post`,
        method: 'POST',
        body: body,
      }),
    }),

    updateRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: ({ id, ...rest }) => ({
        url: `/recipe/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),

    deleteRecipe: builder.mutation<{ success: boolean; id: String }, number>({
      query: (id) => ({
        url: `/recipe/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useGetRecipeByNameQuery,
  useGetRecipeBySectionQuery,
  useListRecipesQuery,
  useListRecipesLimitQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi
