import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    try {
      const data = userService.create(req.body);
      if (!data) {
        res.data = { message: "Can't create user or user exists!" };
        res.status(400);
      } else {
        res.data = data;
        res.status(201);
      }
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// TODO: Implement route controllers for user

export { router };
