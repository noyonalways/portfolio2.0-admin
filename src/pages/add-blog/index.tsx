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
import { useCreateBlogMutation } from "@/redux/features/blog/blogApi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogSchema, TCreateBlogSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TagInput from "@/components/form/tag-input";
import { tags } from "@/constants/tags";

const AddBlog = () => {
  const [, { isLoading }] = useCreateBlogMutation();
  const { data: categories } = useGetCategoriesQuery(undefined);

  const form = useForm<TCreateBlogSchema>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      contentType: "text",
    },
  });

  const onSubmit = async (data: TCreateBlogSchema) => {
    try {
      console.log("Form submission data:", data);
      // Uncomment when ready to actually submit
      // const response = await createBlog(data).unwrap();
      // toast.success("Blog created successfully!");
    } catch (error) {
      toast.error("Error creating blog.");
      console.error("Error creating blog:", error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1  pb-8">
              {/* Left Column - Main Content */}
              <div className="space-y-6 flex flex-col">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm">Blog Title</Label>
                      <FormControl>
                        <Input
                          placeholder="Enter blog title"
                          {...field}
                          className="text-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cover"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <Label className="text-sm">Cover Image</Label>
                      <FormControl>
                        <div className="flex flex-col gap-2 flex-1">
                          <label
                            htmlFor="cover-image"
                            className="relative flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition-colors"
                          >
                            {field.value ? (
                              <img
                                src={field.value}
                                alt="Cover preview"
                                className="absolute inset-0 w-full h-full rounded-xl object-cover"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-muted-foreground p-6">
                                <UploadCloud className="w-8 h-8 mb-2" />
                                <p className="text-sm text-center">
                                  Click to upload or drag and drop
                                  <span className="block text-xs mt-1 text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                  </span>
                                </p>
                              </div>
                            )}
                          </label>
                          <Input
                            id="cover-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () =>
                                  field.onChange(reader.result);
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <Label className="text-sm">Main Content</Label>
                      <FormControl>
                        <Textarea
                          placeholder="Write your blog content here..."
                          {...field}
                          className="flex-1 min-h-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column - Metadata */}
              <div className="space-y-6 flex flex-col">
                <FormField
                  control={form.control}
                  name="brief"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm">Short Description</Label>
                      <FormControl>
                        <Input
                          placeholder="A brief summary of your blog"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <fieldset className="border p-4 rounded-xl space-y-4">
                  <legend className="px-2 font-medium text-sm">
                    Author Details
                  </legend>
                  <FormField
                    control={form.control}
                    name="author.name"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-sm">Full Name</Label>
                        <FormControl>
                          <Input
                            placeholder="Author's name"
                            {...field}
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="author.email"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-sm">Email Address</Label>
                        <FormControl>
                          <Input
                            placeholder="author@example.com"
                            {...field}
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </fieldset>

                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-sm">Category</Label>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories?.data?.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-sm">Tags</Label>
                        <FormControl>
                          <TagInput
                            {...field}
                            suggestions={tags}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contentType"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm">Content Type</Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select content type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mdx">MDX</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="string">String</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className=" flex justify-end gap-4">
              <Button type="button" variant="outline" className="h-10 px-6">
                Discard
              </Button>
              <Button type="submit" disabled={isLoading} className="h-10 px-8">
                {isLoading ? "Publishing..." : "Publish Blog"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddBlog;
