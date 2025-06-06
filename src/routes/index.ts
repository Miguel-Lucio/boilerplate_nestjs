import { Router } from "express";
import { companyRouter } from "./company.route";
import { loginRouter } from "./login.route";

export const router = Router();

router.use("/companies", companyRouter);
router.use("/login", loginRouter);
