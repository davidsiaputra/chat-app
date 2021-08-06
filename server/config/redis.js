import redis from "redis";
import bluebird from "bluebird";

bluebird.promisifyAll(redis);

const host = process.env.HOSTNAME || "localhost";
const redisPort = process.env.REDIS_PORT || "6379";

const redisClient = redis.createClient({
  host,
  port: redisPort,
});

redisClient.on("connect", () => {
  console.log("Connected to redis");
});

export default redisClient;
