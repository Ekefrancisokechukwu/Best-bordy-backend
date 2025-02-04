import { Request, Response } from "express";
import User from "../model/User";
import { BadRequestError, NotFoundError, UnAuthorizedError } from "../errors";
import mongoose from "mongoose";

export async function getCurrentUser(
  req: Request,
  res: Response
): Promise<void> {
  const loggedInUserId = req?.user?.id;
  const userId = req.params.userId;

  if (!mongoose.isValidObjectId(userId)) {
    throw new BadRequestError("Invalid userId");
  }

  if (loggedInUserId !== userId) {
    throw new UnAuthorizedError(
      "You are not authorized to access this user's information."
    );
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found!`);
  }

  res.status(200).json({ sucess: true, user });
}
