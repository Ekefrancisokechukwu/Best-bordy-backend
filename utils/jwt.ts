import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";

export interface User {
  email: string;
  username: string;
  id: string | number | unknown;
}

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  username: string;
  id: string;
}

const createToken = (payload: User) => {
  const secretKey = process.env.JWT_SECRET as string;

  const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
  return token;
};

const isTokenvalid = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

const attachcookiesToResponse = (res: Response, tokenUser: User) => {
  const token = createToken(tokenUser);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  return token;
};

export { attachcookiesToResponse, isTokenvalid };
