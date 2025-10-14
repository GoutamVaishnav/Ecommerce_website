// ESM
import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});
const PORT = Number(process.env.PORT) || 8001;
fastify.get("/", async (request, reply) => {
  reply.send({ message: "Order Service is running on port " + PORT });
  console.log("Order Service is running on port " + PORT);
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
