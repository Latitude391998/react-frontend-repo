import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '../store/slice/authSlice';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/', // change this
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  let result = await baseQuery(args, api, extraOptions);

  // access token expired
  if (result?.error?.status === 401 && typeof args !== 'string' && args.url !== '/auth/refresh') {
    console.log('Access token expired. Trying refresh...');

    const refreshResult: any = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions);

    if (refreshResult?.data) {
      const newToken = refreshResult.data.accessToken;

      // save new token
      localStorage.setItem('accessToken', newToken);

      // keep existing user
      const user = api.getState().auth.user;

      api.dispatch(
        setCredentials({
          user,
          token: newToken,
        }),
      );

      // retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh failed
      localStorage.removeItem('accessToken');

      api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<{ message: string; data: any }, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<{ token: string; user: any }, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query<any, void>({
      query: () => '/user/profile',
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useRegisterMutation } = authApi;
