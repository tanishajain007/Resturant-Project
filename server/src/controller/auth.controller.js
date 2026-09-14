import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { hashPassword } from "../libs/Hashing.js"
import jwt from "jsonwebtoken"
import { GenerateToken, verifyToken } from "../libs/token.js"

export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        // Find user
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User with this email doesn't exist",
            });
        }

        // Compare password
        const checkPassword = await bcrypt.compare(
            password,
            userData.password
        );

        if (!checkPassword) {
            return res.json({
                success: false,
                message: "Wrong password",
            });
        }

        // Generate JWT
        const token = await GenerateToken({
            id: userData._id,
            role: userData.role,
        });

        console.log(token);

        // Store cookie
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
            httpOnly: true,
            secure: false, // true in production with HTTPS
            sameSite: "lax",
        });

        return res.json({
            success: true,
            message: "Login Successful",
            user: {
                id: userData._id,
                name: userData.name,
                email: userData.email,
                role: userData.role,
            },
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const RegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please fill the name first!"
            });
        }

        if (!email || email.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!email.includes("@")) {
            return res.status(400).json({
                success: false,
                message: "Kindly provide a valid email"
            });
        }

        if (!password || password.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Password is mandatory!"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashPass = await hashPassword(password);

        const result = await User.create({
            name,
            email,
            password: hashPass,
            role: "user"
        });

        const token = await GenerateToken({
            id: result._id,
            role: result.role
        });

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3600 * 1000 * 24 * 180),
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: {
                id: result._id,
                name: result.name,
                email: result.email,
                role: result.role
            }
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const LogoutController = async (req, res) => {
    try {

        res.clearCookie("jwt", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logout Successfully",
        });

    } catch (error) {

        console.log("LOGOUT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Error on Server",
        });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const token = req.cookies;

        console.log(token)
        console.log(typeof token)

        if (Object.keys(token).length == 0) {
            return res.json({
                success: false,
                message: "Token not found"
            })
        }

        console.log(token)

        console.log(await verifyToken(token.jwt));

        let decodedToken = await verifyToken(token.jwt);

        return res.json({
            success: true,
            token: decodedToken
        })
    } catch (error) {
        console.log({
            "error": "You got Error",
            "errorinfo": error
        })
        return res.json({
            success: false,
            message: "Error on Server"
        })
    }
}