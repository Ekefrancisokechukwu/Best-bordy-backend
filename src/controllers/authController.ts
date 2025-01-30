import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
  // const {} = req.body;
  res.status(201).json({ message: "Register sucessfully" });
}

export async function login(req: Request, res: Response) {
  res.status(200).json({ message: "Login sucessfully" });
}

export async function logout(req: Request, res: Response) {
  res.status(200).json({ message: "Logout sucessfully" });
}
