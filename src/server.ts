import http, { Server } from "http";
import app from "./app";
import { prisma } from "./config/db";
import envVars from "./config/env.config";

let server: Server | null = null;

async function connectToDb() {
  try {
    await prisma.$connect();
    console.log("** DB connection successfully! **");
  } catch (error) {
    console.log("** DB connection failed! **");
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectToDb();
    server = http.createServer(app);
    server.listen(envVars.PORT, () => {
      console.log(`🚀 Server is running on : http://localhost:${envVars.PORT}`);
    });

    handleProcessEvents();
  } catch (error) {
    console.error("❌ Error during server startup:", error);
    process.exit(1);
  }
}

/**
 * Gracefully shutdown the server and close database connections.
 * @param {string} signal - The termination signal received.
 */
async function gracefulShutdown(signal: string): Promise<void> {
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log("✅ HTTP server closed.");

      try {
        console.log("Server shutdown complete.");
      } catch (error) {
        console.error("❌ Error during shutdown:", error);
      }

      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

/**
 * Handle system signals and unexpected errors.
 */
function handleProcessEvents() {
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
}

// Start the application
startServer();
