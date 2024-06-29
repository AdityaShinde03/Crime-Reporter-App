import { verifyJWT } from "../utils/tokenUtils.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]) || req.query.token;
    if (!token) {
        return res.status(401).json({ msg: "No token provided, authorization denied" });
    }

    try {
        const decoded = await verifyJWT(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ msg: "Invalid token, authorization denied" });
    }
};

