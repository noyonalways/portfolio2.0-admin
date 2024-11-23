import { baseApi } from "@/redux/api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (projectInfo) => {
        return {
          url: "/projects",
          method: "POST",
          body: projectInfo,
        };
      },
    }),
    allProject: builder.query({
      query: () => {
        return {
          url: "/projects",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useAddProjectMutation, useAllProjectQuery } = authApi;
