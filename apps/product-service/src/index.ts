import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
import { clerkMiddleware, getAuth, Token } from "@clerk/express";
import { authUser } from "./middleware/authMiddleware.js";
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:8002", "http://localhost:8001"],
    credentials: true,
  })
);
app.use(clerkMiddleware());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Product Service is running on port " + PORT);
});
app.get("/health", (req: Request, res: Response) => {
  return res.json({
    message: " Product Service is healthy ",
    status: 200,
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

app.get("/test", authUser, (req: Request, res: Response) => {
  return res.json({
    message: "user is authenticate for product service ",
    userId: req.userId,
  });
});

app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
});
