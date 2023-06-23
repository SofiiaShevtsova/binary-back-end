import res from "express/lib/response.js";
import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const HttpError = (message) => {
   return res.data = { message: message, status: 400 };
  };

  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const checkKeys = Object.keys(req.body).every((key) =>
    Object.keys(USER).includes(key)
  );
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    HttpError("You miss some fields!");
  }
  if (!checkKeys) {
    HttpError("You have unexpected fields!");
  }
  if (typeof firstName !== "string" || typeof lastName !== "string") {
    HttpError("Incorrect enter name!");
  }
  const regexEmail = /\w+@gmail.\w{1,5}/;
  const checkEmail = email.match(regexEmail);
  if (!checkEmail) {
    next(HttpError("Incorrect email!"));
  }
  if (!(phoneNumber.startsWith("+380") && phoneNumber.length === 13)) {
    HttpError("Incorrect phone number!");
  }
  if (password.length < 3) {
    HttpError("Incorrect password!");
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
