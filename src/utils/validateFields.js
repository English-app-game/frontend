import { userS } from "../consts/strings";
import { invalidEmail, onlyLetters, passwordLen, requiredEmail, requiredPassword, requiredUserName, selectAvatar } from "./utilsStrings";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegister(dataform) {
  const errors = {};

  if (!dataform.name.trim()) {
    errors.name = requiredUserName;
  } else if (!/^[A-Za-z0-9]+$/.test(dataform.name)) {
    errors.name = onlyLetters;
  }

  validateEmail(dataform.email, errors);

  validatePassword(dataform.password, errors);

  if (!dataform.avatarImg.trim()) {
    errors.avatarImg = selectAvatar;
  }

  return errors;
}

export function validateEmail(email, errors) {
  if (!email.trim()) {
    errors.email = requiredEmail;
  } else if (!emailRegex.test(email)) {
    errors.email = invalidEmail;
  }
}

export function validatePassword(password, errors) {
  if (!password.trim()) {
    errors.password = requiredPassword;
  } else if (password.length < 8 || password.length > 16) {
    errors.password = passwordLen;
  }
}

export const isValidEmail = (email) => {
  return emailRegex.test(email);
};

export function validateLogin() {
  const userString = sessionStorage.getItem(userS);
  if (userString) return false;
  return true;
}
