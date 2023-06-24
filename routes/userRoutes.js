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
      if (!data) {
        res.data = { message: "Can't find users!", status: 404 };
      } else {
        res.data = { data: data, status: 200 };
      }
    } catch (err) {
      res.err = err;
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
      const data = await userService.search({ id: id });
      if (!data) {
        res.data = { message: "Can't find user!", status: 404 };
      } else {
        res.data = { data: data, status: 200 };
      }
    } catch (err) {
      res.err = err;
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
      if (!res.data) {
        const data = await userService.create(req.body);
        if (typeof data === "string") {
          res.data = {
            message: data,
            status: data === "This email or phone number exists!" ? 400 : 404,
          };
        } else {
          res.data = { data: data, status: 201 };
        }
      }
    } catch (err) {
      res.err = err;
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
      if (!res.data) {
        const { id } = req.params;
        const responce = await userService.update(id, req.body);
        if (typeof responce === "string") {
          res.data = {
            message: responce,
            status: responce === "User not found!" ? 404 : 400,
          };
        } else {
          res.data = { data: updateUser, status: 201 };
        }
      }
    } catch (err) {
      res.err = err;
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
      if (!deleteUser) {
        res.data = {
          message: "Can't find user!",
          status: 404,
        };
      } else {
        res.data = {
          message: "User is deleted!",
          status: 204,
        };
      }
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
