// server/migrate.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const client = await pool.connect();

  try {
    console.log("Starting database migration...");

    // Add updated_at column if it doesn't exist
    await client.query(`
      ALTER TABLE resumes 
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();
    `);

    console.log("✅ Added updated_at column");

    // Create or replace the trigger function
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    console.log("✅ Created/updated trigger function");

    // Drop existing trigger if it exists
    await client.query(`
      DROP TRIGGER IF EXISTS update_resumes_updated_at ON resumes;
    `);

    // Create new trigger
    await client.query(`
      CREATE TRIGGER update_resumes_updated_at
          BEFORE UPDATE ON resumes
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log("✅ Created trigger");
    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(console.error);
