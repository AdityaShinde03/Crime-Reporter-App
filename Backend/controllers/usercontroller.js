// Importing necessary modules and utility functions
import UserModel from "../models/UserModels.js";
import { createJWT } from "../utils/tokenUtils.js";
import { hashPassword, comparePassword } from "../utils/passowrdUtils.js";

/**
 * Register a new user.
 * 
 * @function register
 * @async
 * @param {Object} req - Express request object containing user details in the body.
 * @param {Object} res - Express response object used to send a response to the client.
 * 
 * @returns {Promise<void>} - Returns a JSON response with success status, user information, and JWT token.
 * 
 * @example
 * // Example request body:
 * {
 *     "email": "user@example.com",
 *     "password": "userpassword",
 *     "otherDetails": { "name": "John Doe" }
 * }
 * 
 * // Example response:
 * {
 *     "success": true,
 *     "msg": "Registered Successfully",
 *     "userInfo": { ...user details... },
 *     "token": "JWT token"
 * }
 */
export const register = async (req, res) => {
    try {
        const { email, password, ...otherDetails } = req.body; // Destructure email, password, and other details from request body

        // Check if user with the same email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, msg: "User already registered with this email" });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);
        // Create a new user with hashed password and other details
        const user = await UserModel.create({ ...otherDetails, email, password: hashedPassword });
        // Generate JWT token for the user
        const token = createJWT({ userId: user._id });

        // Send success response with user information and token
        res.status(201).json({ success: true, msg: "Registered Successfully", userInfo: user, token });
        // Optionally, set cookies with user info and token
        // res.cookie('user', user, { httpOnly: true, secret: true, sameSite: 'strict', path: '/' });
        // res.cookie('token', token, { httpOnly: true, secret: true, sameSite: 'strict', path: '/' });

    } catch (error) {
        console.error("Error during registration:", error);
        // Send error response
        res.status(500).json({ success: false, msg: "Error registering user", error: error.message });
    }
};

/**
 * Login an existing user.
 * 
 * @function login
 * @async
 * @param {Object} req - Express request object containing login credentials in the body.
 * @param {Object} res - Express response object used to send a response to the client.
 * 
 * @returns {Promise<void>} - Returns a JSON response with success status, user information, and JWT token.
 * 
 * @example
 * // Example request body:
 * {
 *     "email": "user@example.com",
 *     "password": "userpassword"
 * }
 * 
 * // Example response:
 * {
 *     "msg": "Login Successfully",
 *     "userInfo": { ...user details... },
 *     "token": "JWT token"
 * }
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure email and password from request body
        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "User is not registered" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        // Generate JWT token for the user
        const token = createJWT({ userId: user._id });
        // Send success response with user information and token
        res.status(200).json({ msg: "Login Successfully", userInfo: user, token });
        // Optionally, set cookies with user info and token
        // res.cookie('user', user, { httpOnly: true, secret: true, sameSite: 'strict', path: '/' });
        // res.cookie('token', token, { httpOnly: true, secret: true, sameSite: 'strict', path: '/' });

    } catch (error) {
        console.error("Error during login:", error);
        // Send error response
        res.status(500).json({ msg: "Error logging in", error: error.message });
    }
};
