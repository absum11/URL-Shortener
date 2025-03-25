const Redis = require("ioredis");
const { redis: redisConfig } = require("../../config");

class RedisClient {
	constructor() {
		if (!RedisClient.instance) {
			RedisClient.instance = new Redis({
				host: redisConfig.host,
				port: redisConfig.port
			});

			// Redis event listeners
			RedisClient.instance.on("connect", () =>
				console.log("Connected to Redis")
			);
			RedisClient.instance.on("error", (err) =>
				console.error("Redis Error:", err)
			);
		}

		return RedisClient.instance;
	}
}

//leveraging Singleton design pattern: Export the same instance always
const redisClient = new RedisClient();
module.exports = redisClient;

