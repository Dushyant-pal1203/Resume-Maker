import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { testConnection } from "./db";

const app = express();
const httpServer = createServer(app);
const port = parseInt(process.env.PORT || "5000", 10);

// Security and performance middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
  })
);
app.use(compression());

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

// Apply rate limiting to API routes
app.use("/api", apiLimiter);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
    limit: "10mb", // Increase limit for potential PDF base64 uploads
  })
);

app.use(express.urlencoded({ extended: false, limit: "10mb" }));

// Logger utility
export function log(
  message: string,
  source = "express",
  level: "info" | "error" | "warn" = "info"
) {
  const formattedTime = new Date().toISOString();
  const logMessage = `${formattedTime} [${source.toUpperCase()}] ${level.toUpperCase()}: ${message}`;

  console.log(logMessage);

  // In production, you might want to write to a file or use a logging service
  if (level === "error" && process.env.NODE_ENV === "production") {
    // Add error reporting service here (Sentry, etc.)
  }
}

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} ${duration}ms`;
      if (capturedJsonResponse && process.env.NODE_ENV === "development") {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse).slice(0, 200)}`;
      }

      log(logLine, "request");
    }
  });

  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

async function startServer() {
  try {
    // Test database connection
    await testConnection();

    // Register all routes
    await registerRoutes(httpServer, app);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      log(`Error ${status}: ${message}`, "error", "error");

      // Don't leak stack traces in production
      const errorResponse =
        process.env.NODE_ENV === "production"
          ? { message }
          : { message, stack: err.stack };

      res.status(status).json(errorResponse);
    });

    // Serve static files
    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    // Graceful shutdown
    const gracefulShutdown = () => {
      log("Shutting down gracefully...");
      httpServer.close(() => {
        log("Server closed");
        process.exit(0);
      });

      setTimeout(() => {
        log("Could not close connections in time, forcefully shutting down");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);

    // Start server
    httpServer.listen(port, () => {
      log(`Server running on http://localhost:${port}`);
      log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    log(`Failed to start server: ${error}`, "startup", "error");
    process.exit(1);
  }
}

startServer();
