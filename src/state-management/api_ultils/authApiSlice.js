import { apiSlice } from "@/state-management/api_ultils/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: 'http://127.0.0.1:3000/api/v2/auth',
        method: 'POST',
        body: { ...credentials }
      })
    }),
  })
});

export const { useLoginMutation } = authApiSlice
