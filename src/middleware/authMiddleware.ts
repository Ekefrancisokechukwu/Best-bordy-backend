import { User } from "types/global";
import { isTokenvalid } from "../../utils/jwt";
import { UnAuthorizedError } from "../errors";
import { NextFunction, Request, Response } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnAuthorizedError("Authentication token is required.");
  }

  try {
    const decoded = isTokenvalid(token);
    req.user = decoded as User;
    next();
  } catch (error) {
    throw new UnAuthorizedError("Token is not valid");
  }
}
