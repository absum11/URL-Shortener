const Redis = require("ioredis");
const { redis: redisConfig } = require("../../config");

const initialiseRedisClient = () => {
  const redisClient = new Redis({
    host: redisConfig.host,
    port: redisConfig.port,
  });

// Check Redis Connection
redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("error", (err) => console.error("Redis Error:", err));

return redisClient;
};

const getRedisClient = () => {
    return initialiseRedisClient();
};

module.exports = {getRedisClient}

// todos
// learn docker and docker-compose
// make this redis client singleton
// add redis caching layer to service
// bring up a mongodb connection and perform read write using it
// 10 linked-list questions
// prettier integrate
//  pre-commit hooks
//  integrate bearer
// integrate auth