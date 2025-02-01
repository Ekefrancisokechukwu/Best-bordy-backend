import { BadRequestError } from "../errors";
import { Request, Response } from "express";
import { User } from "../model/User";

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

export async function login(req: Request, res: Response) {
  res.status(200).json({ message: "Login sucessfully" });
}

export async function logout(req: Request, res: Response) {
  res.status(200).json({ message: "Logout sucessfully" });
}
