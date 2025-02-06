import { baseApi } from "@/redux/api"; // Import the base API

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/blogs", // Adjust the endpoint as necessary
        method: "POST",
        body: newBlog,
      }),
    }),
    getBlogs: builder.query({
      query: () => ({
        url: "/blogs", // Adjust the endpoint as necessary
        method: "GET",
      }),
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
