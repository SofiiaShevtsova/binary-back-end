import { USER } from "../models/user.js";
import formatingString from "../helpers/formatString.js";
import validationError from "../helpers/validationError.js";

const validate = (data, res) => {
  if (data.firstName) {
    data.firstName = formatingString(data.firstName);
  }
  if (data.lastName) {
    data.lastName = formatingString(data.lastName);
  }
  const { firstName, lastName, email, phoneNumber, password } = data;

  const checkKeys = Object.keys(data).every((key) =>
    Object.keys(USER).includes(key)
  );
  if (!checkKeys) {
    return validationError("You have unexpected fields!", res);
  }
  if (firstName === null || lastName === null) {
    return validationError("Incorrect enter name!", res);
  }
  const regexEmail = /\w+@gmail\.\w{1,5}/g;
  const checkEmail = email && email.match(regexEmail) && !email.includes(" ");
  if (email && !checkEmail) {
    return validationError("Incorrect email!", res);
  }
  if (
    phoneNumber &&
    (!phoneNumber.match(/^\+380[0-9]{9}/i) || phoneNumber.length !== 13)
  ) {
    return validationError("Incorrect phone number!", res);
  }
  if (password && password.length < 3 && !password.includes(" ")) {
    return validationError(
      "Incorrect password! Password must be 3 symbol or more.",
      res
    );
  }
};

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    validationError("You miss some fields!", res);
  }
  validate(req.body, res);
  next();
};

const updateUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  if (!firstName && !lastName && !email && !phoneNumber && !password) {
    validationError("You miss fields!", res);
  }
  validate(req.body, res);
  next();
};

export { createUserValid, updateUserValid };
