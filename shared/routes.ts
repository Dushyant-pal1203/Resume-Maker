import { z } from "zod";
import { insertResumeSchema, resumes } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;

export type ResumeContent = z.infer<typeof insertResumeSchema>["content"];

// ATS Check response type
export type AtsCheckResponse = {
  score: number;
  feedback: string;
  suggestions: string[];
};

// --- API Configuration ---
export const api = {
  resumes: {
    list: {
      method: "GET" as const,
      path: "/api/resumes",
      responses: {
        200: z.array(z.custom<Resume>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/resumes/:id",
      responses: {
        200: z.custom<Resume>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/resumes",
      input: insertResumeSchema,
      responses: {
        201: z.custom<Resume>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: "PUT" as const,
      path: "/api/resumes/:id",
      input: insertResumeSchema.partial(),
      responses: {
        200: z.custom<Resume>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: "DELETE" as const,
      path: "/api/resumes/:id",
      responses: {
        204: z.null(),
      },
    },
  },
  ai: {
    atsCheck: {
      method: "POST" as const,
      path: "/api/ai/ats-check",
      input: z.object({
        resumeData: z.any(), // Flexible input
        jobDescription: z.string().optional(),
      }),
      responses: {
        200: z.object({
          score: z.number(),
          feedback: z.string(),
          suggestions: z.array(z.string()),
        }),
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
