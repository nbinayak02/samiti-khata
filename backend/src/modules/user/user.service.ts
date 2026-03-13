import bcrypt from "bcrypt";
import { userRepository } from "./user.repository";
import { UserLogIn, UserSignUp } from "./user.type";
import {
  NotFoundError,
  UnauthorizedError,
  UnprocessableEntityError,
} from "../../errors/customError";
import { tokenLibrary } from "../../lib/token";

export const userService = {
  //sign up user
  signUp: async (userData: UserSignUp) => {
    // check if user already exists
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new UnprocessableEntityError("User already exists with this email");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // create user
    const user = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return user;
  },

  // log in user
  logIn: async (userData: UserLogIn) => {
    const user = await userRepository.findByEmail(userData.email);

    if (!user) throw new UnprocessableEntityError("User doesn't exist");

    const passwordMatch = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!passwordMatch)
      throw new UnprocessableEntityError("Password didn't matched.");

    const userRole = await userRepository.getUserRoleById(user.id);

    if (!userRole)
      throw new UnauthorizedError(
        "User acount is not approved. Please contact the admin.",
      );

    // generate token
    const { accessToken, refreshToken } = tokenLibrary.generateTokens({
      id: user.id,
      role: userRole.role,
    });

    // save refresh token in database
    const expiryDuration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await userRepository.saveRefreshToken(
      user.id,
      refreshToken,
      expiryDuration,
    );

    // return token
    return { accessToken, refreshToken };
  },

  getUserProfile: async (userId: number) => {
    const user = await userRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    return { ...user, password: undefined };
  },

  refreshToken: async (refreshToken: string) => {
    const user = tokenLibrary.validateToken(refreshToken);

    if (!user)
      throw new UnauthorizedError("Invalid token. Please log in again.");

    const session = await userRepository.findSessionByToken(refreshToken);

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedError("Session expired. Please log in again.");
    }

    if (session.refreshedAt) {
      throw new UnauthorizedError(
        "Security alert: This refresh token has already been used. Please log in again.",
      );
    }

    // generate new tokens
    const { accessToken, refreshToken: newRefreshToken } =
      tokenLibrary.generateTokens({
        id: user.id,
        role: user.role,
      });

    // mark the session as refreshed and save new refresh token in database
    await userRepository.markSessionRefreshedAndSaveNewToken(
      session.id,
      user.id,
      newRefreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    );

    return { accessToken, newRefreshToken };
  },
};
