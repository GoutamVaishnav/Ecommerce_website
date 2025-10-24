import Clerk from "@clerk/fastify";
import { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { userId } = Clerk.getAuth(request);

  if (!userId) {
    return reply
      .status(401)
      .send({ message: "You are not logged in for order-service!" });
  }

  request.userId = userId;
}
