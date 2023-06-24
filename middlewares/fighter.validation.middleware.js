import { FIGHTER } from "../models/fighter.js";

const HttpError = (message, res) => {
  return (res.data = { message: message, status: 400 });
};

const validate = (fighter, res) => {
  const { name, power, defense, healht } = fighter;
  const checkKeys = Object.keys(fighter).every((key) =>
    Object.keys(FIGHTER).includes(key)
  );
  if (!checkKeys) {
    return HttpError("You have unexpected fields!", res);
  }
  if (name && typeof name !== "string") {
    return HttpError("Incorrect enter name!", res);
  }
  if (power && power <= 1 && !power >= 100) {
    console.log(power <= 100);
    return HttpError("Power must be a number 1-100!", res);
  }
  if (defense && defense <= 1 && defense >= 10) {
    return HttpError("Defense must be a number 1-10!", res);
  }
  if (healht && healht <= 80 && healht >= 120) {
    return HttpError("Healht must be a number 80-120!", res);
  }
};

const createFighterValid = (req, res, next) => {
  const { name, power, defense } = req.body;

  if (!name || !power || !defense) {
    HttpError("You miss some fields!", res);
  }

  validate(req.body, res);
  next();
};

const updateFighterValid = (req, res, next) => {
  validate(req.body, res);
  next();
};

export { createFighterValid, updateFighterValid };
