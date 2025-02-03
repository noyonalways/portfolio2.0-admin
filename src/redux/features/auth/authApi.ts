import { baseApi } from "@/redux/api";
import { TResponseError } from "@/types";

interface ErrorResponse {
  data?: TResponseError;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response: ErrorResponse) => {
        return response?.data;
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
