import redis from 'redis';

const redisClient = redis.createClient({ url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });

redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('end', () => {
    console.log('Redis client disconnected');
});

export default redisClient;
