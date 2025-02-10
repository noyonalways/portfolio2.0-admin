import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2, Trash } from "lucide-react";
import { useDeleteProjectMutation } from "@/redux/features/project/projectApi";
import { toast } from "sonner";

interface DeleteProjectModalProps {
  projectId: string;
}

const DeleteProjectModal = ({ projectId }: DeleteProjectModalProps) => {
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  const handleDeleteProject = async () => {
    const result = await deleteProject(projectId).unwrap();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-md h-8 w-8">
            <Trash className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this blog?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove the
              project from the system.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex justify-center items-center h-[150px]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <></>
          )}

          <DialogFooter className="flex justify-end gap-y-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button variant="outline" onClick={handleDeleteProject}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteProjectModal;
