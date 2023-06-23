import res from "express/lib/response.js";
import { USER } from "../models/user.js";

const HttpError = (message, res) => {
  return (res.data = { message: message, status: 400 });
};

const validate = (user, HttpError, res) => {
  const { firstName, lastName, email, phoneNumber, password } = user;
  const checkKeys = Object.keys(user).every((key) =>
    Object.keys(USER).includes(key)
  );
  if (!checkKeys) {
    return HttpError("You have unexpected fields!", res);
  }
  if (
    (firstName && typeof firstName !== "string") ||
    (lastName && typeof lastName !== "string")
  ) {
    return HttpError("Incorrect enter name!", res);
  }
  const regexEmail = /\w+@gmail.\w{1,5}/;
  const checkEmail = email && email.match(regexEmail);
  if (email && !checkEmail) {
      console.log("yes");

    return HttpError("Incorrect email!", res);
  }
  if (
    phoneNumber &&
    !(phoneNumber.startsWith("+380") && phoneNumber.length === 13)
  ) {
    return HttpError("Incorrect phone number!", res);
  }
  if (password && password.length < 3) {
    return HttpError("Incorrect password!", res);
  }
};

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    HttpError("You miss some fields!", res);
  }
  validate(req.body, HttpError, res);
  next();
};

const updateUserValid = (req, res, next) => {
  validate(req.body, HttpError, res);
  next();
};

export { createUserValid, updateUserValid };
