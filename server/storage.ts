import { db } from "./db";
import {
  resumes,
  type InsertResume,
  type Resume,
  type UpdateResume,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getResumes(): Promise<Resume[]>;
  getResume(id: number): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: number, updates: UpdateResume): Promise<Resume>;
  updateAtsScore(id: number, score: number, feedback: string): Promise<Resume>;
  deleteResume(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getResumes(): Promise<Resume[]> {
    return await db.select().from(resumes).orderBy(resumes.createdAt);
  }

  async getResume(id: number): Promise<Resume | undefined> {
    const [resume] = await db.select().from(resumes).where(eq(resumes.id, id));
    return resume;
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const [resume] = await db.insert(resumes).values(insertResume).returning();
    return resume;
  }

  async updateResume(id: number, updates: UpdateResume): Promise<Resume> {
    // Add updatedAt timestamp back
    const updatesWithTimestamp = {
      ...updates,
      updatedAt: new Date(),
    };

    const [updated] = await db
      .update(resumes)
      .set(updatesWithTimestamp)
      .where(eq(resumes.id, id))
      .returning();

    if (!updated) {
      throw new Error(`Resume with id ${id} not found`);
    }

    return updated;
  }

  async updateAtsScore(
    id: number,
    score: number,
    feedback: string
  ): Promise<Resume> {
    return this.updateResume(id, {
      atsScore: score,
      atsFeedback: feedback,
    });
  }

  async deleteResume(id: number): Promise<void> {
    await db.delete(resumes).where(eq(resumes.id, id));
  }
}

export const storage = new DatabaseStorage();
