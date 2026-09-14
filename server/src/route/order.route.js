import { Router } from "express";
import {
    CreateOrder,
    getAllOrderAdmin,
    getAllOrderUser,
    UpdateOrderStatus,
} from "../controller/order.controller.js";
import roleMiddleware from "../libs/roleMiddleware.js";

const router = Router();

// create order

router.post("/create", roleMiddleware("admin", "user"), CreateOrder);

router.post("/chageStatus/:id", roleMiddleware("admin"), UpdateOrderStatus);
router.get("/getAllOrderAdmin", roleMiddleware("admin"), getAllOrderAdmin);
router.get("/getAllOrderUser", roleMiddleware("user"), getAllOrderUser);
// update order status

export default router;