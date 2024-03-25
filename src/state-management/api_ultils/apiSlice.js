import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "@/state-management/slices/authSlice";
import { getAccessToken } from "@/utils/auth_helpers";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_HOST + '/' + process.env.NEXT_PUBLIC_API_DEFAULT_PATH,
  credentials: 'include',
  prepareHeaders: (headers, { _getState }) => {
    const accessToken = getAccessToken();
    if (accessToken) headers.set('authorization', `Bearer ${accessToken}`)

    return headers;
  },
});

// const baseQueryWithReAuth = async (args, api, extraOptions) => {
//   let result = await baseQueryWithAuth(args, api, extraOptions)
//
//   if (result?.error?.originalStatus === 401) {
//     api.dispatch(logOut())
//     // // Send refresh token to get new access token
//     //
//     // const refreshResult = await baseQuery('/refresh', api, extraOptions);
//     //
//     // if (refreshResult?.data) {
//     //   const user = api.getState().auth.user;
//     //
//     //   // store the new token
//     //   api.dispatch(setCredentials({ ...refreshResult.data, user }))
//     //   // retry the original query with the new token
//     //   result = await baseQuery(args, api, extraOptions)
//     // } else {
//     //
//     // }
//   }
//
//   return result;
// }

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: _build => ({})
})
