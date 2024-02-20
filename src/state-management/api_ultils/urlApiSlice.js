import { apiSlice } from "@/state-management/api_ultils/apiSlice";

export const urlApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUrls: builder.query({
      query: () => 'urls',
    }),
    addUrl: builder.mutation({
      query(body) {
        return {
          url: 'urls',
          method: 'POST',
          body,
        }
      },
    }),
    updateUrl: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `urls/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
    deleteUrl: builder.mutation({
      query(id) {
        return {
          url: `urls/${id}`,
          method: 'DELETE',
        }
      },
    }),
  })
});

export const {
  useGetUrlsQuery,
  useAddUrlMutation,
  useUpdateUrlMutation,
  useDeleteUrlMutation,
} = urlApiSlice
