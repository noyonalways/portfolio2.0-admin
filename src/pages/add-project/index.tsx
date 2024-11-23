import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShinyButton from "@/components/ui/shiny-button";
import { Textarea } from "@/components/ui/textarea";
import { useAddProjectMutation } from "@/redux/features/project/projectApi";
import { LoaderCircle, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProjectPage = () => {
  const [files, setFiles] = useState<File[]>([]); // Store files (cover + additional images)

  const [addProject, { isLoading }] = useAddProjectMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "Test",
      description: "Test",
      brief: "test",
      features: "Feature1, Feature2, Feature3",
      type: "frontend",
      frontend: {
        technologies: "React.js,Next.js",
        deploymentLink: "teadf",
        github: "tgeafd",
      },
      backend: {
        technologies: "Express.js,Node.js,",
        deploymentLink: "daf",
        github: "dfafd",
      },
    },
  });

  // Handle file uploads (cover + additional images)
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files![0]; // Store the file at the specific index
    setFiles(newFiles);
  };

  // Handle adding a new input field for additional images
  const addImageField = () => {
    if (files.length < 6) {
      setFiles([...files]); // Add null as placeholder for new file input
    } else {
      alert(
        "You can only upload a maximum of 6 files (1 cover + 5 additional images)."
      );
    }
  };

  // Handle removing an additional image
  const removeImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    data.features = data.features.split(",");
    data.frontend.technologies = data.frontend.technologies.split(",");
    data.backend.technologies = data.backend.technologies.split(",");

    try {
      if (!files[0]) {
        toast.error("Cover image is required.");
        return;
      }

      if (files.length < 2) {
        toast.error("Please upload at least one additional image.");
        return;
      }

      if (files.length > 6) {
        toast.error(
          "You can upload a maximum of 6 files (1 cover image and 5 additional images)."
        );
        return;
      }

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      // Append all images (cover + additional images)
      formData.append("cover", files[0]); // Cover image
      files.slice(1).forEach((file) => {
        formData.append("images", file); // Additional images
      });

      // console.log("Submitted Data:", Object.fromEntries(formData));
      await addProject(formData).unwrap();
      toast.success("Project added successfully!");
    } catch (error) {
      console.log(error);
    }

    // console.log(res);

    // Add your API submission logic here (e.g., API call)
    reset(); // Reset the form after submission
    setFiles([]); // Reset files after submission
  };

  // const { data } = useAllProjectQuery(undefined);
  // const projects = data?.data;

  return (
    <section className="p-0 md:flex">
      {isLoading ? (
        <div className="flex justify-center h-[calc(100vh-200px)] items-center">
          <ShinyButton className="text-white text-sm font-medium" disabled>
            <div className="flex space-x-2 items-center">
              <LoaderCircle className="animate-spin" />
              <span>Adding Project...</span>
            </div>
          </ShinyButton>
        </div>
      ) : (
        <div className="max-w-4xl md:mx-auto w-full bg-white dark:bg-neutral-900 p-2 md:p-8 rounded-md ">
          <h1 className="font-bold text-3xl mb-8 text-center">
            Add New Project
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Cover Image Upload */}
            <div>
              <Label htmlFor="cover-image" className="mb-2 block">
                Cover Image
              </Label>
              <Input
                type="file"
                id="cover-image"
                onChange={(e) => handleFileUpload(e, 0)} // Handle the first file as cover
              />
            </div>

            {/* Additional Images Upload */}
            <div>
              <Label htmlFor="additional-images" className="mb-2 block">
                Additional Images
              </Label>
              <div className="grid md:grid-cols-3 gap-4">
                {files.slice(1).map((file, index) => (
                  <div key={index} className="relative">
                    <Input
                      type="file"
                      onChange={(e) => handleFileUpload(e, index + 1)} // Handle other files as additional images
                    />
                    {file && <span>{file.name}</span>}
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => removeImage(index + 1)}
                      size="icon"
                      className="absolute top-1 right-1"
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" onClick={addImageField} className="mt-4">
                + Add More Images
              </Button>
              {files.length < 2 && (
                <p className="text-red-500 text-sm mt-2">
                  At least one additional image is required.
                </p>
              )}
            </div>

            {/* Basic Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  placeholder="Project Title"
                  id="title"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input
                  placeholder="e.g., Full-Stack"
                  id="type"
                  {...register("type", { required: "Type is required" })}
                />
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>
            </div>

            {/* Description & Brief */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Project Description"
                  id="description"
                  rows={4}
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="brief">Brief</Label>
                <Textarea
                  placeholder="Short Brief"
                  id="brief"
                  rows={4}
                  {...register("brief", { required: "Brief is required" })}
                />
                {errors.brief && (
                  <p className="text-red-500 text-sm">{errors.brief.message}</p>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label htmlFor="features">Features</Label>
              <Textarea
                placeholder="List features separated by commas"
                id="features"
                rows={3}
                {...register("features", { required: "Features are required" })}
              />
              {errors.features && (
                <p className="text-red-500 text-sm">
                  {errors.features.message}
                </p>
              )}
            </div>

            {/* Frontend Details */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Frontend Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="frontend-technologies">Technologies</Label>
                  <Input
                    placeholder="e.g., React, Tailwind"
                    id="frontend-technologies"
                    {...register("frontend.technologies", {
                      required: "Frontend technologies are required",
                    })}
                  />
                  {errors.frontend?.technologies && (
                    <p className="text-red-500 text-sm">
                      {errors.frontend.technologies.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frontend-deploymentLink">
                    Deployment Link
                  </Label>
                  <Input
                    placeholder="e.g., https://frontend.com"
                    id="frontend-deploymentLink"
                    {...register("frontend.deploymentLink", {
                      required: "Frontend deployment link is required",
                    })}
                  />
                  {errors.frontend?.deploymentLink && (
                    <p className="text-red-500 text-sm">
                      {errors.frontend.deploymentLink.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frontend-github">GitHub Link</Label>
                  <Input
                    placeholder="e.g., https://github.com/project"
                    id="frontend-github"
                    {...register("frontend.github", {
                      required: "Frontend GitHub link is required",
                    })}
                  />
                  {errors.frontend?.github && (
                    <p className="text-red-500 text-sm">
                      {errors.frontend.github.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Backend Details */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Backend Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="backend-technologies">Technologies</Label>
                  <Input
                    placeholder="e.g., Node.js, MongoDB"
                    id="backend-technologies"
                    {...register("backend.technologies", {
                      required: "Backend technologies are required",
                    })}
                  />
                  {errors.backend?.technologies && (
                    <p className="text-red-500 text-sm">
                      {errors.backend.technologies.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backend-deploymentLink">
                    Deployment Link
                  </Label>
                  <Input
                    placeholder="e.g., https://backend.com"
                    id="backend-deploymentLink"
                    {...register("backend.deploymentLink", {
                      required: "Backend deployment link is required",
                    })}
                  />
                  {errors.backend?.deploymentLink && (
                    <p className="text-red-500 text-sm">
                      {errors.backend.deploymentLink.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backend-github">GitHub Link</Label>
                  <Input
                    placeholder="e.g., https://github.com/project"
                    id="backend-github"
                    {...register("backend.github", {
                      required: "Backend GitHub link is required",
                    })}
                  />
                  {errors.backend?.github && (
                    <p className="text-red-500 text-sm">
                      {errors.backend.github.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ShinyButton type="submit" className="w-full md:w-auto">
                Add Project
              </ShinyButton>
            </div>
          </form>
        </div>
      )}

      {/* <div className="space-y-4">
        {projects?.map((project) => (
          <div key={project?._id}>
            <h2 className="font-semibold text-lg">{project.title}</h2>
            <p>{project.description}</p>
            <p>{project.brief}</p>
            <p>
              Technologies: {project.frontend.technologies},{" "}
              {project.backend.technologies}
            </p>
            <p>Frontend Deployment: {project.frontend.deploymentLink}</p>
            <p>Frontend GitHub: {project.frontend.github}</p>
            <p>Backend Deployment: {project.backend.deploymentLink}</p>
            <p>Backend GitHub: {project.backend.github}</p>
            <hr />
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default AddProjectPage;
