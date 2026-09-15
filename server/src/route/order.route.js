import { Router } from "express";

import {
    CreateOrder,
    GetAllOrderAdmin,
    GetUserOrder,
    UpdateOrderStatus,
} from "../controller/order.controller.js";

import roleMiddleware from "../libs/roleMiddleware.js";

const router = Router();


// ===============================
// CREATE ORDER
// ===============================

router.post(
    "/create",
    roleMiddleware("admin", "user"),
    CreateOrder
);


// ===============================
// UPDATE ORDER STATUS
// ===============================

router.post(
    "/changeStatus/:id",
    roleMiddleware("admin"),
    UpdateOrderStatus
);


// ===============================
// ADMIN ORDERS
// ===============================

router.get(
    "/getAllOrderAdmin",
    roleMiddleware("admin"),
    GetAllOrderAdmin
);


// ===============================
// USER ORDERS
// ===============================

router.get(
    "/getAllOrderUser",
    roleMiddleware("user"),
    GetUserOrder
);


export default router;