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
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
  atsScore: true,
  atsFeedback: true,
});

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;

// Flexible Resume Content Type to match any UI
export interface ResumeContent {
  proficiencyLevels: any;
  skillCategories: any;
  sectionOrder?: string[]; // Made optional for backward compatibility
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
    technologies: string[]; // Fixed: changed from array of objects to string array for simplicity
  }>;
  customSections?: Array<{
    id: string;
    title: string;
    type: "text" | "list" | "date" | "link";
    content: string | string[];
  }>;
}

export type CreateResumeRequest = InsertResume;
export type UpdateResumeRequest = Partial<InsertResume>;

export interface AtsCheckRequest {
  resumeData: ResumeContent;
  jobDescription?: string;
}

export interface AtsCheckResponse {
  score: number;
  feedback: string;
  suggestions: string[];
}
