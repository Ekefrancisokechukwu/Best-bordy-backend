import { signup } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);

export default router;
