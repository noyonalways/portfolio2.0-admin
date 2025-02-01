import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/useTheme";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { formSchema, TFormSchema } from "@/schemas";
import { TResponseError, TUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { Moon, Sun } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: TFormSchema) => {
    try {
      const response = await login(data).unwrap();
      if (response.success) {
        toast.success("Login successful");
        const user = jwtDecode(response.data.token);
        dispatch(
          setUser({
            token: response.data.token,
            user: user as TUser,
          })
        );
        navigate("/");
      }
    } catch (err) {
      const error = err as TResponseError;
      if (!error.success) {
        toast.error(error.message);
      }
    }
  };

  return (
    <section className="flex justify-center items-center h-svh px-4 lg:px-0 relative">
      <button
        className="absolute right-4 top-4 rounded-full border p-2"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="max-w-md w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <h1 className="text-xl font-bold text-center">Admin Login</h1>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
