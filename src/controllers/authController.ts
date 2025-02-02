import { BadRequestError, NotFoundError } from "../errors";
import { Request, Response } from "express";
import User from "../model/User";
import { attachcookiesToResponse } from "../../utils/jwt";

export async function signup(req: Request, res: Response) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    throw new BadRequestError("Please Provide all values");
  }

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  const user = await User.create({ email, password, username });

  res.status(201).json({ message: "Register sucessfully", user });
}

async function sendAccountCofirmation() {}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("No user found!");
  }

  const passwordMatch = await user.comparePassword(password);

  if (!passwordMatch) {
    throw new BadRequestError("Invalid Password");
  }

  attachcookiesToResponse(res, {
    email: user.email,
    id: user._id,
    username: user.username,
  });

  res.status(200).json({ message: "Login sucessfully", user });
}

export async function logout(req: Request, res: Response) {
  res.status(200).json({ message: "Logout sucessfully" });
}
