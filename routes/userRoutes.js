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
  (req, res, next) => {
    try {
      const data = userService.getAll();
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
  (req, res, next) => {
    try {
      const id = req.params;
      const data = userService.search(id);
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
  (req, res, next) => {
    try {
      if (!res.data) {
        const data = userService.create(req.body);
        if (!data) {
          res.data = {
            message: "Can't create user or user exists!",
            status: 400,
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
  (req, res, next) => {
    try {
      if (!res.data) {
        const id = req.params;
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
  (req, res, next) => {
    try {
      const id = req.params;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
