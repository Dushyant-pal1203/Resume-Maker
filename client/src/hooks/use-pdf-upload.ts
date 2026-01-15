// hooks/use-pdf-upload.ts
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useResumes } from "./use-resumes";

export const usePdfUpload = () => {
  const { toast } = useToast();
  const { refetch } = useResumes();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("/api/resumes/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "🎉 PDF Successfully Analyzed!",
        description: "Your resume has been parsed and is ready for editing",
        className: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white",
      });
      refetch();
      return data;
    },
    onError: (error: Error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to process PDF",
        variant: "destructive",
        className: "bg-gradient-to-r from-red-600 to-rose-600 text-white",
      });
    },
  });
};
