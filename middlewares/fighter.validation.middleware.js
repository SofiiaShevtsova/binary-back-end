import { FIGHTER } from "../models/fighter.js";
import formatingString from "../helpers/formatString.js";
import validationError from "../helpers/validationError.js";

const validate = (fighter, res) => {
  if (fighter.name) {
    fighter.name = formatingString(fighter.name);
  }
  const { name, power, defense, health } = fighter;
  const checkKeys = Object.keys(fighter).every((key) =>
    Object.keys(FIGHTER).includes(key)
  );
  if (!checkKeys || fighter.id) {
    return validationError("You have unexpected fields!", res);
  }
  if (name === null) {
    return validationError(
      "Incorrect enter name! The name must be less than 15 characters and contain no spaces.",
      res
    );
  }
  if (typeof power !== "number" || power === 0 || power <= 1 || power >= 100) {
    return validationError("Power must be a number 1-100!", res);
  }
  if (
    typeof defense !== "number" ||
    defense === 0 ||
    defense <= 1 ||
    defense >= 10
  ) {
    return validationError("Defense must be a number 1-10!", res);
  }
  if (
    typeof health !== "number" ||
    health === 0 ||
    health <= 80 ||
    health >= 120
  ) {
    return validationError("Healht must be a number 80-120!", res);
  }
};

const createFighterValid = (req, res, next) => {
  const { name, power, defense } = req.body;

  if (!name || !power || !defense) {
    validationError("You miss some fields!", res);
  }

  validate(req.body, res);
  next();
};

const updateFighterValid = (req, res, next) => {
  const { name, power, defense } = req.body;

  if (!name && !power && !defense) {
    validationError("You miss fields!", res);
  }

  validate(req.body, res);
  next();
};

export { createFighterValid, updateFighterValid };
