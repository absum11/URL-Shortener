const Redis = require("ioredis");
const { redis: redisConfig } = require("../../config");

class RedisSingleton {
    constructor() {
        if (!RedisSingleton.instance) {
            RedisSingleton.instance = new Redis({
                host: redisConfig.host,
                port: redisConfig.port,
            });

            // Redis event listeners
            RedisSingleton.instance.on("connect", () => console.log("Connected to Redis"));
            RedisSingleton.instance.on("error", (err) => console.error("Redis Error:", err));
        }

        return RedisSingleton.instance;
    }
}

// Export the same instance always
const redisClient = new RedisSingleton();
module.exports = redisClient;

// todos
// learn docker and docker-compose    sdone
// make this redis client singleton   done
// add redis caching layer to service   done
// bring up a mongodb connection and perform read write using it
// 10 linked-list questions
// prettier integrate          done
//  pre-commit hooks
//  integrate bearer
// integrate auth