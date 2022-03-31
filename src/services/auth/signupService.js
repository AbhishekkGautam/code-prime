import axios from "axios";

export const signupService = (firstName, lastName, email, password) => {
  return axios.post("/api/auth/signup", {
    firstName,
    lastName,
    email,
    password,
  });
};
