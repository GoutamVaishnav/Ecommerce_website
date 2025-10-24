import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  console.log(auth);
  const userid = auth.userId;
  if (!userid) {
    return res.json({
      message: " You are not logged in for product service !",
    });
  }
  req.userId = auth.userId;
  next();
};
