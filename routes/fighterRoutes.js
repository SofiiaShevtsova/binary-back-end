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
        res.data = { message: "Can't find fighters!", status: 404 };
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
      const data = await fighterService.search({ id: id });
      if (!data) {
        res.data = { message: "Can't find fighter!", status: 404 };
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
  createFighterValid,
  async (req, res, next) => {
    try {
      if (!res.data) {
        const data = await fighterService.create(req.body);
        if (!data) {
          res.data = {
            message: "Can't create fighter or fighter exists!",
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
  updateFighterValid,
  async (req, res, next) => {
    try {
      if (!res.data) {
        const { id } = req.params;
        const updateFighter = await fighterService.update(id, req.body);
        if (!updateFighter) {
          res.data = {
            message: "Can't find fighter! Or this fighter name exists!",
            status: 404,
          };
        } else {
          res.data = { data: updateFighter, status: 201 };
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
      const deleteFighter = await fighterService.delete(id);
      if (!deleteFighter) {
        res.data = {
          message: "Can't find fighter!",
          status: 404,
        };
      } else {
        res.data = {
          message: "Fighter is deleted!",
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
