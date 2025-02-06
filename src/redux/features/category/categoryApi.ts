import { baseApi } from "@/redux/api";
import { TCategory, TResponse } from "@/types";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/categories", // Adjust the endpoint as necessary
        method: "POST",
        body: newCategory,
      }),
    }),

    getCategories: builder.query<TResponse<TCategory[]>, void>({
      query: () => ({
        url: "/categories", // Adjust the endpoint as necessary
        method: "GET",
      }),
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/categories/${id}`, // Adjust the endpoint as necessary

        method: "GET",
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...updatedCategory }) => ({
        url: `/blogs/${id}`, // Adjust the endpoint as necessary
        method: "PATCH",
        body: updatedCategory,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`, // Adjust the endpoint as necessary
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
