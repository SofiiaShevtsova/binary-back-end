import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  async (req, res, next) => {
    try {
      const data = await authService.login(req.body)
      res.data = { data: data, status: 200 };
    } catch (err) {
      res.data = { message: err.message, status: 404, error: true };
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
