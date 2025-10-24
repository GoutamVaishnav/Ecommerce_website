// ESM
import Fastify from "fastify";
import Clerk from "@clerk/fastify";
import { authMiddleware } from "./middleware/authMiddleware.js";

const fastify = Fastify({
  logger: true,
});
fastify.register(Clerk.clerkPlugin);
const PORT = Number(process.env.PORT) || 8001;

fastify.get("/", async (request, reply) => {
  reply.send({ message: "Order Service is running on port " + PORT });
  console.log("Order Service is running on port " + PORT);
});

fastify.get("/health", async (request, reply) => {
  return reply.send({
    message: "Order Service is running",
    status: 200,
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});
fastify.get("/test", { preHandler: authMiddleware }, async (request, reply) => {
  return reply.send({
    message: "You are authenticated for Order Service",
    userId: request.userId,
    status: 200,
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});
const start = async () => {
  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
