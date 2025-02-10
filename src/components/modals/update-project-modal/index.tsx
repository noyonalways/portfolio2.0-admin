import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { TProject } from "@/types";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectModalProps {
  project: TProject;
}

const UpdateProjectModal = ({ project }: ProjectModalProps) => {
  const [open, setOpen] = useState(false);

  // Log project details when the modal opens
  useEffect(() => {
    if (open) {
      console.log(project);
    }
  }, [open, project]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-md h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Update Project: {project.title}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[600px] pr-2">
            <div className="flex flex-col gap-y-4 p-2">
              <div className="flex flex-col gap-y-2">
                <Label>Title</Label>
                <Input type="text" value={project.title} placeholder="Title" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Description</Label>
                <Textarea
                  className="border rounded-md p-2"
                  value={project.description}
                  placeholder="Description"
                  rows={4}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Brief</Label>
                <Input type="text" value={project.brief} placeholder="Brief" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Cover Image</Label>
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {project.images.map((image) => (
                  <div key={image} className="w-full rounded overflow-hidden">
                    <img src={image} alt={project.title} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Type</Label>

                <Input
                  type="text"
                  value={project.type}
                  placeholder="Type"
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Status</Label>
                <Input
                  type="text"
                  value={project.status}
                  placeholder="Status"
                  readOnly
                />
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="flex justify-end gap-y-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button variant="outline">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProjectModal;
