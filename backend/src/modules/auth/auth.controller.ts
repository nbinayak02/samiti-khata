import { Request, Response } from "express";
import { authService } from "./auth.service";
import { CustomRequest } from "../../types/customRequest";
import { ForbiddenError } from "../../errors/customError";

export const authController = {
  handleSignUp: async (req: Request, res: Response) => {
    const user = await authService.signUp(req.body);

    res.status(201).json({
      message: "User created successfully",
      data: { ...user, password: undefined },
    });
  },

  handleLogIn: async (req: Request, res: Response) => {
    const isProduction = process.env.NODE_ENV === "production";
    const { accessToken, refreshToken, userInfo } = await authService.logIn(
      req.body,
    );

    res
      .status(200)
      .cookie("token", refreshToken, {
        httpOnly: isProduction ? true : false,
        secure: isProduction ? true : false,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "User logged in successfully",
        data: {
          token: accessToken,
          ...userInfo,
        },
      });
  },

  getUserProfile: async (req: CustomRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) throw new ForbiddenError("User id not found in token");

    const user = await authService.getUserProfile(userId);

    return res.status(200).json({
      message: "User profile fetched successfully",
      data: { ...user },
    });
  },

  handleTokenRefresh: async (req: Request, res: Response) => {
    const refreshToken = req.cookies.token;

    if (!refreshToken)
      throw new ForbiddenError("Refresh token not found in cookies");

    const { accessToken, newRefreshToken } =
      await authService.refreshToken(refreshToken);

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
