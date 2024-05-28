import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

export default {
  createToken,
  verifyToken,
};
