/* eslint-disable no-template-curly-in-string */
import * as Yup from "yup";

const specialCharacters = "!@#$%";
const specialCharRegex = `^.*[${specialCharacters}]+.*$`;
const numberRegex = /^.*[0-9]+.*$/;
const capitalRegex = /^.*[A-Z]+.*$/;

const userName = Yup.string().required("Username is required");
const firstName = Yup.string().required("First name is required");
const lastName = Yup.string().required("Last name is required");
const email = Yup.string()
  .required("Email is required")
  .email("Email is invalid");

export const passwordRules = {
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least ${min} characters long")
    .max(20, "Password must be less than ${max} characters long")
    .test(
      "password-chars",
      `Password must have at least one of ${specialCharacters}`,
      value => value && value.match(specialCharRegex)
    )
    .test(
      "password-nums",
      "Password must have at least one number",
      value => value && value.match(numberRegex)
    )
    .test(
      "password-uppercase",
      "Password must have at least one uppercase letter",
      value => value && value.match(capitalRegex)
    ),
  password2: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
};

export const createUserRules = {
  userName,
  email,
  firstName,
  lastName
};

export const createClientRules = {
  email,
  firstName,
  lastName
};
