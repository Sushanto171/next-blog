import dotenv from "dotenv";
import path from "path";

//Load .env file from root directory
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

//Define required environment variables
const requiredVars = ["PORT", "NODE_ENV"] as const;

// Define type for required environment variables
interface EnvVars {
  PORT: string;
  NODE_ENV: "development" | "production" | "test";
  DATABASE_URL?: string;
  JWT_SECRET?: string;
  [key: string]: string | undefined;
}

//  Validate required environment variables
for (const variable of requiredVars) {
  if (!process.env[variable]) {
    console.error(`❌ Missing required environment variable: ${variable}`);
    process.exit(1);
  }
}

// Create a config object with validated environment variables
const envVars: EnvVars = {
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default envVars;
