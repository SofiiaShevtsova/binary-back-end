import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const data = await userService.getAll();
      res.data = { data: data, status: 200 };
    } catch (err) {
      res.data = { message: err.message, status: 404 };
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await userService.getOne(id);
      res.data = { data: data, status: 200 };
    } catch (err) {
      res.data = { message: err.message, status: 404 };
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  async (req, res, next) => {
    try {
      if (res.err) {
        throw new Error(res.err.message);
      }
      const data = await userService.create(req.body);
      res.data = { data: data, status: 200 };
    } catch (err) {
      res.data = { message: err.message, status: 400 };
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  async (req, res, next) => {
    try {
      if (res.err) {
        throw new Error(res.err.message);
      }
      const { id } = req.params;
      const data = await userService.update(id, req.body);
      res.data = { data: data, status: 200 };
    } catch (err) {
      res.data = {
        message: err.message,
        status: err.message === "User not found!" ? 404 : 400,
      };
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteUser = await userService.delete(id);
      res.data = {
        message: "User is deleted!",
        status: 204,
      };
    } catch (err) {
      res.data = { message: err.message, status: 404 };
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
