import User from "../models/user.model.js";

export const registerUserService = async (name, email, password, role) => {
  if (!name || !email || !password) {
    throw new Error("Please provide all the fields");
  }
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new Error("User already exist with this email");
  }
  const newUser = await User.create({
    name,
    email,
    password,
  });

  return newUser;
};

//* Generate OTP Service

