import { Router } from "express";

import {
    CreateFood,
    DeleteOne,
    GetOneData,
    ReadAllData,
    UpdateFoodData
} from "../controller/food.controller.js";

import multer from "../libs/multer.cjs";

const router = Router();

router.post(
    "/create",
    multer.array("foodImage"),
    CreateFood
);

router.post(
    "/updateFoodData/:id",
    UpdateFoodData
);

router.get(
    "/getAllFood",
    ReadAllData
);

router.get(
    "/getOneFood/:id",
    GetOneData
);

router.delete(
    "/deleteOne/:id",
    DeleteOne
);

export default router;