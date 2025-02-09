import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "@/redux/features/blog/blogApi";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Blogs = () => {
  const { data: blogs, isFetching } = useGetBlogsQuery(undefined);
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteBlog(id).unwrap();
      if (response.success) {
        toast.success("Blog deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting blog.");
      console.log("Error deleting blog:", error);
    }
  };

  return (
    <>
      {isFetching ? (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="max-w-[calc(100vw-2rem)] lg:max-w-full">
          <h1 className="text-2xl font-bold mb-4">Blogs Management</h1>
          <div className="overflow-x-auto rounded-lg border">
            <Table className="min-w-[800px] lg:min-w-full">
              <TableHeader className="bg-sidebar">
                <TableRow>
                  <TableHead className="w-24">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Brief</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs?.data?.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      <div className="w-24">
                        <img
                          src={blog.cover}
                          alt={blog.title}
                          className="w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-[180px] lg:w-auto">{blog.title}</div>
                    </TableCell>
                    <TableCell>
                      <div className="w-[100px] lg:w-auto">
                        {blog.author.name}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {blog.brief}
                    </TableCell>
                    <TableCell>
                      <div className="w-[100px] lg:w-auto">
                        {blog.category?.name}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">
                      <Badge className="capitalize">{blog.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="rounded-md h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you sure you want to delete this blog?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently remove the blog from the system.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex justify-end gap-y-4">
                              <DialogClose asChild>
                                <Button type="button" variant="outline">
                                  Close
                                </Button>
                              </DialogClose>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(blog._id)}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default Blogs;
