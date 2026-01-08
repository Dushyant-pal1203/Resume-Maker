import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

// Initialize OpenAI client - Replit AI integration handles the key automatically
const openai = new OpenAI({ 
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL 
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Resume CRUD Routes
  app.get(api.resumes.list.path, async (req, res) => {
    const resumes = await storage.getResumes();
    res.json(resumes);
  });

  app.get(api.resumes.get.path, async (req, res) => {
    const resume = await storage.getResume(Number(req.params.id));
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  });

  app.post(api.resumes.create.path, async (req, res) => {
    try {
      const input = api.resumes.create.input.parse(req.body);
      const resume = await storage.createResume(input);
      res.status(201).json(resume);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.resumes.update.path, async (req, res) => {
    try {
      const input = api.resumes.update.input.parse(req.body);
      const updated = await storage.updateResume(Number(req.params.id), input);
      if (!updated) {
        return res.status(404).json({ message: 'Resume not found' });
      }
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.resumes.delete.path, async (req, res) => {
    await storage.deleteResume(Number(req.params.id));
    res.status(204).end();
  });

  // AI ATS Check Route
  app.post(api.ai.atsCheck.path, async (req, res) => {
    try {
      const { resumeData, jobDescription } = req.body;

      // Construct the prompt
      const prompt = `
        You are an expert ATS (Applicant Tracking System) scanner. 
        Analyze the following resume data and provide an ATS score (0-100), 
        constructive feedback, and specific suggestions for improvement.
        
        Resume Data:
        ${JSON.stringify(resumeData, null, 2)}
        
        ${jobDescription ? `Job Description:\n${jobDescription}` : ''}
        
        Return the response in JSON format with the following keys:
        - score: number (0-100)
        - feedback: string (summary of the analysis)
        - suggestions: array of strings (bullet points for improvement)
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("Failed to get response from AI");
      }

      const result = JSON.parse(content);
      res.json(result);

    } catch (error: any) {
      console.error('ATS Check Error:', error);
      res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
  });

  // Seed Data
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
          summary: "Experienced Full Stack Developer with a passion for building scalable web applications."
        },
        experience: [
          {
            id: "1",
            company: "Tech Corp",
            position: "Senior Developer",
            startDate: "2020-01",
            endDate: "Present",
            description: "Led development of core features using React and Node.js."
          }
        ],
        education: [
          {
            id: "1",
            school: "University of Tech",
            degree: "BS Computer Science",
            graduationDate: "2019"
          }
        ],
        skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
        projects: []
      }
    });
  }

  return httpServer;
}
