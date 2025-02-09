import { useGetProjectsQuery } from "@/redux/features/project/projectApi";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import { TProject } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ProjectsPage = () => {
  const { data: projects, isLoading } = useGetProjectsQuery();

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="max-w-[calc(100vw-2rem)] lg:max-w-full">
          <h1 className="text-2xl font-bold mb-4">Projects Management</h1>
          <div className="overflow-x-auto rounded-lg border">
            <Table className="min-w-[800px] lg:min-w-full">
              <TableHeader className="bg-sidebar">
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Brief</TableHead>
                  <TableHead>Cover</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects?.data?.map((project: TProject) => (
                  <TableRow key={project._id}>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell>{project.brief}</TableCell>
                    <TableCell>
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="w-24 h-24 object-cover"
                      />
                    </TableCell>
                    <TableCell className="capitalize">
                      <div className="w-[100px] lg:w-auto">
                        {project.type.replace("-", " ")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="capitalize">{project.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4 justify-end">
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
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

export default ProjectsPage;
