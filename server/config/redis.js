import redis from "redis";
import bluebird from "bluebird";

// Alloy async function
bluebird.promisifyAll(redis);

const host = process.env.HOSTNAME || "localhost";
const port = process.env.REDIS_PORT || "6379";

let redisClient = null;
if (process.env.REDIS_URL) {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  });
} else {
  redisClient = redis.createClient({
    host,
    port,
  });
}

redisClient.on("connect", () => {
  console.log("Connected to redis");
});

export default redisClient;
