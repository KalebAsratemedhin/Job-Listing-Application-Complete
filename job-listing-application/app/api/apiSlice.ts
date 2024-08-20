import JobPost from '@/app/types/JobPost';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import Bookmark from '../types/Bookmark';

interface Credential{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com' }),
  endpoints: builder => ({
    getAllJobs: builder.query<{data: JobPost[]}, string>({
      query: (token) => ({
        url: '/opportunities/search',
        method: "GET",
        headers:{
          Authorization: token ? `Bearer ${token}` : ""
        } 
      })
      
    }),
    getJobById: builder.query<{data: JobPost}, string>({
      query: postId => `/opportunities/${postId}`,
    }),
    signup: builder.mutation<any, Credential>({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    createBookmark: builder.mutation<any, { eventId: string, token: string }>({
      query: ({ eventId, token }) => ({
        url: `/bookmarks/${eventId}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteBookmark: builder.mutation<any, { eventId: string, token: string }>({
      query: ({ eventId, token }) => ({
        url: `/bookmarks/${eventId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getBookmarks: builder.query<{data: Bookmark[]}, string>({
      query: (token) => ({
        url: '/bookmarks',
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
    }),
    
   
  })
})

export const {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useGetBookmarksQuery,
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useSignupMutation
} = apiSlice