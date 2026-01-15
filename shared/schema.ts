import {
  pgTable,
  text,
  serial,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().default("My Resume"),
  content: jsonb("content").notNull().$type<ResumeContent>(),
  atsScore: integer("ats_score"),
  atsFeedback: text("ats_feedback"),
  template: text("template").notNull().default("modern"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Create insert schema with all fields except auto-generated ones
export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Create update schema that allows partial updates including atsScore and atsFeedback
export const updateResumeSchema = insertResumeSchema.partial().extend({
  atsScore: z.number().int().min(0).max(100).optional(),
  atsFeedback: z.string().optional(),
});

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type UpdateResume = z.infer<typeof updateResumeSchema>;

// Keep the rest of your interface the same...
export interface ResumeContent {
  parsedFromPDF: any;
  proficiencyLevels: any;
  skillCategories: any;
  sectionOrder?: string[];
  personalInfo: {
    additionalInfo: string;
    expectedSalary: string;
    noticePeriod: string;
    availability: string;
    title: string;
    relocation: boolean;
    visaStatus: string;
    nationality: string;
    pronouns: string;
    socialLinks: boolean;
    preferredContact: string;
    website: any;
    linkedin: any;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    graduationDate: string;
  }>;
  skills: string[];
  projects: Array<{
    date: any;
    id: string;
    name: string;
    description: string;
    technologies: string[];
  }>;
  customSections?: Array<{
    id: string;
    title: string;
    type: "text" | "list" | "date" | "link" | "rich-text" | "badges";
    content: string | string[];
  }>;
}

export type CreateResumeRequest = InsertResume;
export type UpdateResumeRequest = UpdateResume;

export interface AtsCheckRequest {
  resumeData: ResumeContent;
  jobDescription?: string;
}

export interface AtsCheckResponse {
  score: number;
  feedback: string;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}
