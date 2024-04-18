const IORedis = require("ioredis")
const RedisStore = require("connect-redis").default

const redisClient = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379")
const redisStore = new RedisStore({ client: redisClient })

module.exports = redisStore