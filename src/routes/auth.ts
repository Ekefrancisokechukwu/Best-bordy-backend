import { login, signup } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
