import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

export default app;
