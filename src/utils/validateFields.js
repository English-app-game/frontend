export function validateRegister(dataform) {
  const errors = {};

  if (!dataform.name.trim()) {
    errors.name = "Username is required";
  } else if (!/^[A-Za-z0-9]+$/.test(dataform.name)) {
    errors.name = "Only letters allowed";
  }

  validateEmail(dataform.email, errors);

  validatePassword(dataform.password, errors);

  if (!dataform.avatarImg.trim()) {
    errors.avatarImg = "Please select an avatar";
  }

  return errors;
}

export function validateEmail(email, errors) {
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.com$/.test(email)) {
    errors.email = "Invalid Email";
  }
}

export function validatePassword(password, errors) {
  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 8 || password.length > 16) {
    errors.password = "Password must be 8–16 characters";
  }
}
