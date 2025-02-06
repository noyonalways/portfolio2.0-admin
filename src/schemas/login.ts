import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please provide a valid email address"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export type TLoginFormSchema = z.infer<typeof formSchema>;
