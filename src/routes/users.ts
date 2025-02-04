import { authenticate } from "../middleware/authMiddleware";
import { getCurrentUser } from "../controllers/userController";
import { Router } from "express";

const router = Router();
router.route("/:userId/me").get(authenticate, getCurrentUser);

export default router;
