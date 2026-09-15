import { verifyToken } from "./token.js";

const roleMiddleware = (...allowedRoles) => {

    return async (req, res, next) => {

        try {

            const { jwt } = req.cookies;

            if (!jwt) {
                return res.status(401).json({
                    message: "Token Not Found",
                    success: false,
                });
            }

            const decodeToken = await verifyToken(jwt);

            if (!decodeToken || !decodeToken.id) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }

            if (!allowedRoles.includes(decodeToken.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied",
                });
            }

            // Optional but useful
            req.user = decodeToken;

            next();

        } catch (error) {

            console.log(
                "Role Middleware Error:",
                error
            );

            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
    };
};

export default roleMiddleware;