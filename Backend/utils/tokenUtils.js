import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file.
dotenv.config();

/**
 * Create a JWT token.
 * 
 * @function createJWT
 * @param {Object} payload - The payload to include in the JWT token.
 * @returns {string} - The generated JWT token.
 * 
 * @example
 * // Example usage:
 * const token = createJWT({ userId: '12345' });
 * // Expected output: A JWT token string.
 */
export function createJWT(payload) {
    // Sign the JWT token with the payload, secret, and expiration time.
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    // Return the generated token.
    return token;
}

/**
 * Verify a JWT token.
 * 
 * @function verifyJWT
 * @param {string} token - The JWT token to verify.
 * @returns {Object} - The decoded payload from the JWT token.
 * 
 * @throws {Error} - Throws an error if the token is invalid or expired.
 * 
 * @example
 * // Example usage:
 * const decoded = verifyJWT(token);
 * // Expected output: The decoded payload object.
 */
export function verifyJWT(token) {
    // Verify the JWT token with the secret.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Return the decoded payload.
    return decoded;
}
