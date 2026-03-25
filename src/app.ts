import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.route";
import catRoutes from "./modules/cat/cat.route";
import bookingRoutes from "./modules/booking/booking.route";
import cageRoutes from "./modules/cage/cage.route";

const app = express();

// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.URL || "http://localhost:5000",
//     credentials: true,
//   }),
// );

app.use(express.json());
app.use(cookieParser());
// app.use(compression());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);

// app.use(morgan("combined"));

app.use("/api/auth", authRoutes);
app.use("/api", catRoutes);
app.use("/api", bookingRoutes);
app.use("/api", cageRoutes);

app.use(errorHandler);
export default app;
