import { Router } from "express";
import { companyRouter } from "./company.route";

export const router = Router();

router.use("/companies", companyRouter);
