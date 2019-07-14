import isEmpty from "./isEmpty";
import validator from "validator";

export const updateUserValidation = (firstName, lastName, email, email2) => {
  let errors = [];

  email && !validator.isEmail(email) && errors.push("Invalid email");
  if (isEmpty(firstName) && isEmpty(lastName) && isEmpty(email) && isEmpty(email2)) {
    errors.push("Fill at least one field to update");
  }
  email && email2 && email !== email2 && errors.push("The emails are different");

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const updatePasswordValidation = (
  currentPassword,
  newPassword,
  newPassword2
) => {
  let errors = [];

  if (isEmpty(currentPassword)) {
    errors.push("Current password field is required");
  }
  if (isEmpty(newPassword)) {
    errors.push("New password field is required");
  }
  if (isEmpty(newPassword2)) {
    errors.push("Confirm password field is required");
  }

  if (newPassword !== newPassword2) {
    errors.push("Passwords do not match");
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const updateAvatarValidation = avatar => {
  let errors = {};

  if (isEmpty(avatar.name)) {
    errors.avatarError = "Required field";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
