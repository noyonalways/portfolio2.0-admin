import { baseApi } from "@/redux/api";
import { TResponse, TProject } from "@/types";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (newProject) => ({
        url: "/projects", // Adjust the endpoint as necessary
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Projects"],
    }),
    getProjects: builder.query<TResponse<TProject[]>, void>({
      query: () => ({
        url: "/projects", // Adjust the endpoint as necessary
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
    getProjectById: builder.query<TResponse<TProject>, string>({
      query: (id) => ({
        url: `/projects/${id}`, // Adjust the endpoint as necessary
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...updatedProject }) => ({
        url: `/projects/${id}`, // Adjust the endpoint as necessary
        method: "PATCH",
        body: updatedProject,
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`, // Adjust the endpoint as necessary
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
