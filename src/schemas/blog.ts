import { z } from "zod";

const author = z.object({
  name: z.string({
    invalid_type_error: "Author name must be string",
    required_error: "Author name is required",
  }),
  email: z
    .string({
      invalid_type_error: "Email must be string",
      required_error: "Email is required",
    })
    .email(),
});

export const createBlogSchema = z.object({
  title: z.string({
    invalid_type_error: "Title must be string",
    required_error: "Title is required",
  }),
  content: z.string({
    invalid_type_error: "Content must be string",
    required_error: "Content is required",
  }),
  brief: z.string({
    invalid_type_error: "Brief must be string",
    required_error: "Brief is required",
  }),
  cover: z.string({
    invalid_type_error: "Cover must be string",
    required_error: "Cover is required",
  }),
  author: author,
  contentType: z.enum(["mdx", "text", "string"] as [string, ...string[]]),
  tags: z.array(z.string(), {
    required_error: "Tags is required",
    invalid_type_error: "Tags must be an array of string",
  }),
  category: z.string({
    invalid_type_error: "Category must be string",
    required_error: "Category is required",
  }),
});

export type TCreateBlogSchema = z.infer<typeof createBlogSchema>;
