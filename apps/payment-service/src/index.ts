import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";

import { Hono } from "hono";
import { authUser } from "./middleware/authMiddleware.js";

const app = new Hono();
app.use("*", clerkMiddleware());
app.get("/test", authUser, (c) => {
  return c.json({
    message: "You are logged in for payment!",
    userId: c.get("userId"),
  });
});
app.get("/health", (c) => {
  return c.json({
    message: "Payment Service is running",
    status: "ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: process.env.PORT ? Number(process.env.PORT) : 8002,
      },
      (info) => {
        console.log(
          `Payment Service is running on http://localhost:${info.port}`
        );
      }
    );
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

start();
