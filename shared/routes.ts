import { z } from "zod";
import { insertResumeSchema, updateResumeSchema, resumes } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    errors: z
      .array(
        z.object({
          field: z.string(),
          message: z.string(),
        })
      )
      .optional(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
    details: z.string().optional(),
  }),
};

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type UpdateResume = z.infer<typeof updateResumeSchema>;

export type ResumeContent = z.infer<typeof insertResumeSchema>["content"];

// ATS Check response type
export type AtsCheckResponse = {
  score: number;
  feedback: string;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
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
      input: updateResumeSchema,
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
    upload: {
      method: "POST" as const,
      path: "/api/resumes/upload",
      input: z.object({
        pdf: z.any(), // File upload
      }),
      responses: {
        201: z.object({
          message: z.string(),
          resume: z.custom<Resume>(),
          extractedText: z.string().optional(),
        }),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
  ai: {
    atsCheck: {
      method: "POST" as const,
      path: "/api/ai/ats-check",
      input: z.object({
        resumeData: z.any(),
        jobDescription: z.string().optional(),
        resumeId: z.number().optional(),
      }),
      responses: {
        200: z.object({
          score: z.number(),
          feedback: z.string(),
          suggestions: z.array(z.string()),
          strengths: z.array(z.string()),
          weaknesses: z.array(z.string()),
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
