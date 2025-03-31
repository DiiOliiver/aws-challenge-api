import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import routers from "./routes";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routers);
app.use(errorHandler);

export default app;
