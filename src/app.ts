import "reflect-metadata";
import "express-async-errors";
import express, { Application, json } from "express";
import cors from "cors";
import { handleAppError } from "./middlewares/handleAppError.middleware";
import { router } from "./routes";

const app: Application = express();
app.use(json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/", router);

app.use(handleAppError);

export default app;
