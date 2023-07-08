import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  MAIN_DIR: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log("invalid enviroment variables", _env.error.format());
  throw new Error("invalid enviroment variables");
}

export const env = _env.data;
