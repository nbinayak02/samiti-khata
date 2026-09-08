import { Request, Response } from "express";
import HealthService from "./health.service";

const HealthController = {
  handleCheckHealth: async (req: Request, res: Response) => {
    const dbHealth = await HealthService.getDbCheck();
    res
      .status(200)
      .json({ message: "Samiti Khata is healthy.", data: dbHealth });
  },
};

export default HealthController;
