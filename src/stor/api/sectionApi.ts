import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Section } from '../slices/sectionSlice'

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
export const sectionApi = createApi({
  reducerPath: 'sectionApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getSections: builder.query<ListResponse<Section>, string | void>({
      query: () => '/section',
    }),
    getSectionById: builder.query<Section, string>({
      query: (id) => `/section/${id}`,
    }),

    getSectionByName: builder.query<Section, string>({
      query: (name) => `/section/name/${name}`,
    }),
    listSections: builder.query<ListResponse<Section>, number>({
      query: (page) => `/section?page=${page}`,
    }),
    listSectionsLimit: builder.query<ListResponse<Section>, OptionsQuery>({
      query: ({ page, limit }) => `/section?page=${page}&limit=${limit}`,
    }),
    addSection: builder.mutation<Section, Partial<Section>>({
      query: (body) => ({
        url: `/section/`,
        method: 'POST',
        body: body,
      }),
    }),

    updateSection: builder.mutation<Section, Partial<Section>>({
      query: ({ id, ...rest }) => ({
        url: `/section/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),

    deleteSection: builder.mutation<{ success: boolean; id: String }, number>({
      query: (id) => ({
        url: `/section/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetSectionsQuery,
  useGetSectionByIdQuery,
  useGetSectionByNameQuery,
  useListSectionsQuery,
  useAddSectionMutation,
  useListSectionsLimitQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionApi
