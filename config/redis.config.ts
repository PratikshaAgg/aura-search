import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://clustercfg.aura-nft-prod-elasticache.ujanam.use1.cache.amazonaws.com:6379:6379',
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => {
  console.log(`Redis connection established`);
});

export default redisClient;
