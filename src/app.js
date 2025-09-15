import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", router);
app.use(errorHandler);
export default app;
