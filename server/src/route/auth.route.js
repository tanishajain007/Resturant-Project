import { Router } from "express";
import { checkAuth, LoginController, LogoutController, RegisterController } from "../controller/auth.controller.js";

const router=Router();

router.post("/login",LoginController)
router.post("/register",RegisterController)
router.get("/check",checkAuth)
router.get("/logout",LogoutController)

export default router;