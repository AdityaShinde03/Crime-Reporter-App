import bcrypt from 'bcryptjs';

/**
 * Hash a plain text password.
 * 
 * @function hashPassword
 * @async
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - The hashed password.
 * 
 * @example
 * // Example usage:
 * const hashedPassword = await hashPassword('mySecretPassword');
 * // Expected output: A hashed password string.
 */
export async function hashPassword(password) {
  // Generate a salt with 10 rounds.
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the generated salt.
  const hashedPassword = await bcrypt.hash(password, salt);
  // Return the hashed password.
  return hashedPassword;
}

/**
 * Compare a plain text password with a hashed password.
 * 
 * @function comparePassword
 * @async
 * @param {string} password - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - Returns true if the passwords match, otherwise false.
 * 
 * @example
 * // Example usage:
 * const isMatch = await comparePassword('mySecretPassword', hashedPassword);
 * // Expected output: true if the passwords match, otherwise false.
 */
export async function comparePassword(password, hashedPassword) {
  // Compare the plain text password with the hashed password.
  const isMatch = await bcrypt.compare(password, hashedPassword);
  // Return the comparison result.
  return isMatch;
}
