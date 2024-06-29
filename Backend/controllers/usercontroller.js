import UserModel  from "../models/UserModels.js";
import { createJWT } from "../utils/tokenUtils.js";
import { hashPassword, comparePassword } from "../utils/passowrdUtils.js";

export const register = async (req, res) => {
    try {
        const { email, password, ...otherDetails } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, msg: "User already registered with this email" });
        }

        const hashedPassword = await hashPassword(password);
        const user = await UserModel.create({ ...otherDetails, email, password: hashedPassword });
        const token = createJWT({ userId: user._id });

        res.status(201).json({ success: true, msg: "Registered Successfully", userInfo: user, token});
        // res.cookie('user',user,{httpOnly:true,secret : true, sameSite: 'strict', path: '/'})
        // res.cookie('token',token,{httpOnly:true,secret : true, sameSite: 'strict', path: '/'})

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ success: false, msg: "Error registering user", error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "User is not registered" });
        }

        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        const token = createJWT({ userId: user._id });
        res.status(200).json({ msg: "Login Successfully", userInfo: user, token });
        // res.cookie('user',user,{httpOnly:true,secret : true, sameSite: 'strict', path: '/'})
        // res.cookie('token',token,{httpOnly:true,secret : true, sameSite: 'strict', path: '/'})

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ msg: "Error logging in", error: error.message });
    }
};