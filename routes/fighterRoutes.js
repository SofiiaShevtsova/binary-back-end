import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const data = await fighterService.getAll();
      if (!data) {
        throw new Error("Can't find fighters!");
      }
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
      const data = await fighterService.search({ id: id });
      if (!data) {
        throw new Error("Can't find fighter!");
      }
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
  createFighterValid,
  async (req, res, next) => {
    try {
      console.log("yes");
      if (res.err) {
        throw new Error(res.err.message);
      }
      const data = await fighterService.create(req.body);
      if (typeof data === "string") {
        throw new Error(data);
      }
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
  updateFighterValid,
  async (req, res, next) => {
    try {
      if (res.err) {
        throw new Error(res.err.message);
      }
      const { id } = req.params;
      const data = await fighterService.update(id, req.body);
      if (typeof data === "string") {
        throw new Error(data);
      }
      res.data = { data: data, status: 200 };
    } catch (err) {
      res.data = {
        message: err.message,
        status: err.message === "Can't find fighter!" ? 404 : 400,
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
      const deleteFighter = await fighterService.delete(id);
      if (!deleteFighter) {
        throw new Error("Can't find fighter!");
      }
      res.data = {
        message: "Fighter is deleted!",
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
