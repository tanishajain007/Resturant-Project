import bcrypt from "bcryptjs"
import { hashPassword } from "../libs/Hashing.js"
import User from "../models/user.model.js"
import { ObjectId } from "mongoose"

export const saveUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (name == "" || name.length == 0) {
            res.json({
                success: "false",
                message: "please fill the name first!"
            })
        }
        if (email == "" || email.length == 0) {
            res.json({
                success: "false",
                message: " email is required"
            })
        }
        if (!email.includes("@")) {
            return res.json({
                success: "false",
                message: " kindly provide a valid email"
            })
        }
        if (password == "" || password.length == 0) {
            res.json({
                success: "false",
                message: "password is mandatory!"
            })
        }

        const hashPass = await hashPassword(password);

        const result = await User.insertOne({
            name: name,
            email: email,
            password: hashPass
        })

        return res.json(result)
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

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body
        const result = await User.findOne({
            _id: id
        })

        console.log(result);
        console.log(typeof password);

        let IsRight = await bcrypt.compare(password, result.password)

        if (!IsRight) {
            return res.json({
                message: "Wrong Password"
            })
        }

        res.json({
            id,
            result
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