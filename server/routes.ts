import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import multer from "multer";
import { PDFExtract } from "pdf.js-extract";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// PDF Extractor instance
const pdfExtract = new PDFExtract();

// Utility function to extract text from PDF
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfExtract.extractBuffer(buffer);
    return data.pages
      .map((page) => page.content.map((item) => item.str).join(" "))
      .join("\n");
  } catch (error) {
    throw new Error(`Failed to extract text from PDF: ${error}`);
  }
}

// Utility function to parse resume data from text
async function parseResumeFromText(text: string): Promise<any> {
  const prompt = `
    Extract resume information from the following text and return it in JSON format.
    
    Resume Text:
    ${text}
    
    Return a JSON object with this structure:
    {
      "personalInfo": {
        "fullName": string,
        "email": string,
        "phone": string,
        "address": string,
        "summary": string,
        "title": string,
        "linkedin": string,
        "website": string
      },
      "experience": [{
        "company": string,
        "position": string,
        "startDate": string,
        "endDate": string,
        "description": string
      }],
      "education": [{
        "school": string,
        "degree": string,
        "graduationDate": string
      }],
      "skills": string[],
      "projects": [{
        "name": string,
        "description": string,
        "technologies": string[]
      }]
    }
    
    Extract as much information as possible. If information is missing, use empty strings/arrays.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using a cheaper model for parsing
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.1, // Low temperature for consistent parsing
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Failed to parse resume");
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw new Error("Failed to parse resume data");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Resume CRUD Routes
  app.get(api.resumes.list.path, async (req, res) => {
    try {
      const resumes = await storage.getResumes();
      res.json(resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  app.get(api.resumes.get.path, async (req, res) => {
    try {
      const resume = await storage.getResume(Number(req.params.id));
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      res.json(resume);
    } catch (error) {
      console.error("Error fetching resume:", error);
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  app.post(api.resumes.create.path, async (req, res) => {
    try {
      const input = api.resumes.create.input.parse(req.body);
      const resume = await storage.createResume(input);
      res.status(201).json(resume);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: err.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }
      console.error("Error creating resume:", err);
      res.status(500).json({ message: "Failed to create resume" });
    }
  });

  app.put(api.resumes.update.path, async (req, res) => {
    try {
      const input = api.resumes.update.input.parse(req.body);
      const updated = await storage.updateResume(Number(req.params.id), input);
      if (!updated) {
        return res.status(404).json({ message: "Resume not found" });
      }
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: err.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }
      console.error("Error updating resume:", err);
      res.status(500).json({ message: "Failed to update resume" });
    }
  });

  app.delete(api.resumes.delete.path, async (req, res) => {
    try {
      await storage.deleteResume(Number(req.params.id));
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting resume:", error);
      res.status(500).json({ message: "Failed to delete resume" });
    }
  });

  // NEW: PDF Upload and Parse Route
  app.post("/api/resumes/upload", upload.single("pdf"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No PDF file uploaded" });
      }

      // Extract text from PDF
      const extractedText = await extractTextFromPDF(req.file.buffer);

      // Parse resume data from extracted text
      const parsedData = await parseResumeFromText(extractedText);

      // Create resume from parsed data
      const resumeData = {
        title:
          `${parsedData.personalInfo.fullName}'s Resume` || "Imported Resume",
        template: "modern",
        content: {
          ...parsedData,
          personalInfo: {
            ...parsedData.personalInfo,
            additionalInfo: "",
            expectedSalary: "",
            noticePeriod: "",
            availability: "",
            relocation: false,
            visaStatus: "",
            nationality: "",
            pronouns: "",
            socialLinks: !!parsedData.personalInfo.linkedin,
            preferredContact: "",
            website: parsedData.personalInfo.website || undefined,
            linkedin: parsedData.personalInfo.linkedin || undefined,
          },
          projects:
            parsedData.projects?.map((proj: any, index: number) => ({
              id: `proj-${index}`,
              ...proj,
              date: "",
            })) || [],
          experience:
            parsedData.experience?.map((exp: any, index: number) => ({
              id: `exp-${index}`,
              ...exp,
            })) || [],
          education:
            parsedData.education?.map((edu: any, index: number) => ({
              id: `edu-${index}`,
              ...edu,
            })) || [],
          proficiencyLevels: undefined,
          skillCategories: undefined,
          customSections: [],
        },
      };

      // Save to database
      const createdResume = await storage.createResume(resumeData);

      res.status(201).json({
        message: "PDF successfully processed",
        resume: createdResume,
        extractedText: extractedText.slice(0, 500), // Return first 500 chars for reference
      });
    } catch (error: any) {
      console.error("PDF Upload Error:", error);

      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File size exceeds 5MB limit" });
      }

      res.status(500).json({
        message: error.message || "Failed to process PDF",
      });
    }
  });

  // AI ATS Check Route
  app.post(api.ai.atsCheck.path, async (req, res) => {
    try {
      const { resumeData, jobDescription } = req.body;

      // Construct the prompt
      const prompt = `
        You are an expert ATS (Applicant Tracking System) scanner. 
        Analyze the following resume data and provide:
        1. An ATS score (0-100)
        2. Constructive feedback
        3. Specific suggestions for improvement
        
        ${
          jobDescription
            ? `Also, compare against this job description:\n${jobDescription}`
            : ""
        }
        
        Resume Data:
        ${JSON.stringify(resumeData, null, 2)}
        
        Important: Be strict but fair. Consider:
        - Keywords matching
        - Formatting and structure
        - Readability
        - Industry standards
        
        Return the response in JSON format with the following keys:
        - score: number (0-100)
        - feedback: string (summary of the analysis, 2-3 paragraphs)
        - suggestions: array of strings (5-10 specific bullet points for improvement)
        - strengths: array of strings (3-5 strong points)
        - weaknesses: array of strings (3-5 areas needing improvement)
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.3,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("Failed to get response from AI");
      }

      const result = JSON.parse(content);

      // If we have a resume ID, update it with the ATS score
      if (req.body.resumeId) {
        await storage.updateResume(Number(req.body.resumeId), {
          atsScore: result.score,
          atsFeedback: result.feedback,
        });
      }

      res.json(result);
    } catch (error: any) {
      console.error("ATS Check Error:", error);
      res.status(500).json({
        message: error.message || "Internal Server Error",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  });

  // Seed Data (only in development)
  if (process.env.NODE_ENV === "development") {
    const existingResumes = await storage.getResumes();
    if (existingResumes.length === 0) {
      await storage.createResume({
        template: "modern",
        title: "Sample Resume",
        content: {
          personalInfo: {
            fullName: "John Doe",
            email: "john@example.com",
            phone: "(555) 123-4567",
            address: "San Francisco, CA",
            summary:
              "Experienced Full Stack Developer with a passion for building scalable web applications.",
            additionalInfo: "",
            expectedSalary: "",
            noticePeriod: "",
            availability: "",
            title: "Senior Full Stack Developer",
            relocation: false,
            visaStatus: "US Citizen",
            nationality: "American",
            pronouns: "he/him",
            socialLinks: true,
            preferredContact: "email",
            website: "https://johndoe.dev",
            linkedin: "https://linkedin.com/in/johndoe",
          },
          experience: [
            {
              id: "1",
              company: "Tech Corp",
              position: "Senior Developer",
              startDate: "2020-01",
              endDate: "Present",
              description:
                "Led development of core features using React and Node.js. Improved application performance by 40%.",
            },
          ],
          education: [
            {
              id: "1",
              school: "University of Tech",
              degree: "BS Computer Science",
              graduationDate: "2019",
            },
          ],
          skills: [
            "React",
            "Node.js",
            "TypeScript",
            "PostgreSQL",
            "AWS",
            "Docker",
          ],
          projects: [
            {
              id: "1",
              name: "E-commerce Platform",
              description:
                "Built a full-featured e-commerce platform with real-time inventory management",
              technologies: ["React", "Node.js", "MongoDB", "Stripe"],
              date: "2022",
            },
          ],
          proficiencyLevels: undefined,
          skillCategories: undefined,
          customSections: [],
          parsedFromPDF: undefined,
        },
      });
    }
  }

  return httpServer;
}
