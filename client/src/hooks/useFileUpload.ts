import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useResumes } from "./use-resumes";

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const { refetch } = useResumes();

  const handleFileUpload = async (file: File) => {
    // Check file type
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid File Format",
        description: "Please upload a PDF file only",
        variant: "destructive",
        className: "bg-gradient-to-r from-red-600 to-rose-600 text-white",
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a PDF smaller than 5MB",
        variant: "destructive",
        className: "bg-gradient-to-r from-red-600 to-rose-600 text-white",
      });
      return;
    }

    setIsUploading(true);

    // Create FormData
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const uploadToast = toast({
        title: "🔮 Quantum Analysis Initiated",
        description: "Uploading and analyzing your PDF...",
        className: "bg-gradient-to-r from-purple-600 to-blue-600 text-white",
        duration: 5000,
      });

      const response = await fetch("/api/resumes/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      uploadToast.dismiss();

      if (!response.ok) {
        throw new Error(result.message || `Upload failed: ${response.status}`);
      }

      toast({
        title: "🎉 PDF Successfully Analyzed!",
        description: "Your resume has been parsed and is ready for editing",
        className: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white",
        duration: 3000,
      });

      await refetch();

      setTimeout(() => {
        if (result.resume?.id) {
          setLocation(`/builder/${result.resume.id}`);
        } else {
          setLocation(`/resumes`);
          toast({
            title: "Resume Created",
            description: "Your resume was created but may need manual review",
            className:
              "bg-gradient-to-r from-amber-600 to-orange-600 text-white",
          });
        }
      }, 1500);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description:
          error.message || "Failed to process PDF. Please try again.",
        variant: "destructive",
        className: "bg-gradient-to-r from-red-600 to-rose-600 text-white",
        duration: 5000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    handleFileUpload,
  };
}
