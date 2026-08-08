import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import routes from "./routes";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

import path from "path";

const app = express();

// Middlewares
app.use(helmet({ crossOriginResourcePolicy: false })); // Allow loading images across origins
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Serve static files (uploaded media)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "Astrospacious API",
    version: "v1",
    status: "Running"
  });
});

// API Routes
app.use("/api/v1", routes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
