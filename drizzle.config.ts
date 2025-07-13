import { defineConfig } from 'drizzle-kit';

// Config for database-first design
export default defineConfig({
  out: "./database/drizzle",
  dialect: "postgresql",
  schema: "public",
  dbCredentials: {
    url: process.env.DSN!,
  }
})
