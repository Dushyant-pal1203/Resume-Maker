import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  api,
  buildUrl,
  type Resume,
  type InsertResume,
  type ResumeContent,
  type AtsCheckResponse,
} from "@shared/routes";
import { z } from "zod";

// --- Types ---
// Helper to define default empty state for a new resume
export const defaultResumeContent: ResumeContent = {
  sectionOrder: [
    "personal-info",
    "experience",
    "education",
    "skills",
    "projects",
  ],
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    website: undefined,
    linkedin: undefined,
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

// --- Hooks ---

export function useResumes() {
  return useQuery({
    queryKey: [api.resumes.list.path],
    queryFn: async () => {
      const res = await fetch(api.resumes.list.path, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch resumes");
      return api.resumes.list.responses[200].parse(await res.json());
    },
  });
}

export function useResume(id: number | null) {
  return useQuery({
    queryKey: [api.resumes.get.path, id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) throw new Error("ID required");
      const url = buildUrl(api.resumes.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch resume");
      return api.resumes.get.responses[200].parse(await res.json());
    },
  });
}

export function useCreateResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertResume) => {
      const validated = api.resumes.create.input.parse(data);
      const res = await fetch(api.resumes.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.resumes.create.responses[400].parse(
            await res.json()
          );
          throw new Error(error.message);
        }
        throw new Error("Failed to create resume");
      }
      return api.resumes.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.resumes.list.path] });
    },
  });
}

export function useUpdateResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: { id: number } & Partial<InsertResume>) => {
      const validated = api.resumes.update.input.parse(updates);
      const url = buildUrl(api.resumes.update.path, { id });
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.resumes.update.responses[400].parse(
            await res.json()
          );
          throw new Error(error.message);
        }
        throw new Error("Failed to update resume");
      }
      return api.resumes.update.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.resumes.list.path] });
      queryClient.invalidateQueries({
        queryKey: [api.resumes.get.path, data.id],
      });
    },
  });
}

export function useDeleteResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.resumes.delete.path, { id });
      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete resume");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.resumes.list.path] });
    },
  });
}

export function useAtsCheck() {
  return useMutation({
    mutationFn: async ({
      resumeData,
      jobDescription,
    }: {
      resumeData: ResumeContent;
      jobDescription?: string;
    }) => {
      const res = await fetch(api.ai.atsCheck.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData, jobDescription }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to perform ATS check");
      }

      // We manually parse here because Zod response schema might need adjusting if the AI returns slightly different structure
      // Ideally we use the schema:
      return api.ai.atsCheck.responses[200].parse(await res.json());
    },
  });
}
