import { baseApi } from "@/redux/api";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => ({
        url: "/dashboard",
        method: "GET",
        params: {
          isDeleted: "false",
        },
      }),
    }),
  }),
});

export const { useGetOverviewQuery } = dashboardApi;
