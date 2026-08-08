import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().min(10, "JWT_SECRET must be at least 10 characters long"),
  JWT_EXPIRES_IN: z.string().default("1d"),
  RESEND_API_KEY: z.string().optional(),
});

const parseEnv = () => {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    process.exit(1);
  }
  return parsed.data;
};

export const env = parseEnv();
