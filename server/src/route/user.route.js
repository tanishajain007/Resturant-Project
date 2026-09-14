import { Router } from "express";
import { getUser, saveUser } from "../controller/user.controler.js";

const router = Router();

router.get("/", async (req, res) => {
    res.send("Welcome User API")
})

router.post("/save", saveUser);
router.post("/:id", getUser);

export default router;