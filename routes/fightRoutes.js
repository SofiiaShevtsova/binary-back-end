import { Router } from "express";
import { fightersService } from "../services/fightService.js";
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
      const data = await fightersService.getAll();
      res.data = { data: data, status: 200 };
    } catch (err) {
      res.data = { message: err.message, status: 404, error: true };
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
      const data = await fightersService.getOne(id);
      res.data = { data: data, status: 200 };
    } catch (err) {
      res.data = { message: err.message, status: 404, error: true };
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  async (req, res, next) => {
    try {
      const data = await fightersService.create(req.body);
      res.data = { data: data, status: 200 };
    } catch (err) {
      res.data = { message: err.message, status: 400, error: true };
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
      await fightersService.delete(id);
      res.data = {
        message: "Fight is deleted!",
        status: 204,
      };
    } catch (err) {
      res.data = { message: err.message, status: 404, error: true };
    } finally {
      next();
    }
  },
  responseMiddleware
);

// OPTIONAL TODO: Implement route controller for fights

export { router };
