import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "@/state_management/slices/authSlice";
import { getAccessToken } from "@/utils/auth_helpers";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://secret-bastion-97105-9201f1d44e83.herokuapp.com/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`)
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 401) {
    console.log('sending refresh token')
    // Send refresh token to get new access token

    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;

      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with the new token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: build => ({})
})
