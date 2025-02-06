import { baseApi } from "@/redux/api"; // Import the base API
import { TBlog, TResponse } from "@/types";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/blogs", // Adjust the endpoint as necessary
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blogs"],
    }),
    getBlogs: builder.query<TResponse<TBlog[]>, void>({
      query: () => ({
        url: "/blogs", // Adjust the endpoint as necessary
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`, // Adjust the endpoint as necessary
        method: "GET",
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...updatedBlog }) => ({
        url: `/blogs/${id}`, // Adjust the endpoint as necessary
        method: "PATCH",
        body: updatedBlog,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`, // Adjust the endpoint as necessary
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreateBlogMutation,
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
