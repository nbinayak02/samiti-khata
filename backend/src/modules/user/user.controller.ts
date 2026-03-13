import { Request, Response } from "express";
import { userService } from "./user.service";
import { CustomRequest } from "../../types/customRequest";
import { ForbiddenError } from "../../errors/customError";

export const userController = {
  handleSignUp: async (req: Request, res: Response) => {
    const user = await userService.signUp(req.body);

    res.status(201).json({
      message: "User created successfully",
      user: { ...user, password: undefined },
    });
  },

  handleLogIn: async (req: Request, res: Response) => {
    const { accessToken, refreshToken } = await userService.logIn(req.body);

    res
      .status(200)
      .cookie("token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "User logged in successfully",
        token: accessToken,
      });
  },

  getUserProfile: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) throw new ForbiddenError("User id not found in token");

    const user = await userService.getUserProfile(userId);

    return res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  },

  handleTokenRefresh: async (req: Request, res: Response) => {
    const refreshToken = req.cookies.token;

    if (!refreshToken)
      throw new ForbiddenError("Refresh token not found in cookies");

    const { accessToken, newRefreshToken } =
      await userService.refreshToken(refreshToken);
      
    res
      .status(200)
      .cookie("token", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "Token refreshed successfully",
        token: accessToken,
      });
  },
};
