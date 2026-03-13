import { Request, Response } from "express";
import { userService } from "./user.service";

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
};
