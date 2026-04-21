import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import routesV1 from "./routes/v1/index.js";
import swaggerSpec from "./config/swagger.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL,
].filter(Boolean);

app.use(helmet());
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS: origin not allowed"));
            }
        },
        credentials: true,
    }),
);
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

app.get("/", (req, res) => {
    res.status(200).json({ message: "TaskForge API running" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", routesV1);

app.use(notFound);
app.use(errorHandler);

export default app;
