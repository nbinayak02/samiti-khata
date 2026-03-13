import jwt from "jsonwebtoken";
import { UserToken } from "../modules/user/user.type";

const jwtSecret = process.env.JWT_SECRET || "adsasd;fj;alj";

export const tokenLibrary = {
  // generate access and refresh token
  generateTokens: (payload: UserToken) => {
    const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, jwtSecret, { expiresIn: "7d" });

    return { accessToken, refreshToken };
  },

  validateToken: (token: string) => {
    try {
      const payload = jwt.verify(token, jwtSecret) as UserToken;
      return payload;
    } catch (error) {
      console.log("Token validation error:", error);
      return null;
    }
  },
};
