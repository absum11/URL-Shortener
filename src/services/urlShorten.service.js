const { v4: uuidv4 } = require("uuid");
const { urlShortenerConfig } = require("../config");
const redisClient = require("../database/redis");

const sourceToShortenedUrlMapping = {};
const shortenedToSourceUrlMapping = {};

const urlShortenService = (url) => {
  if (sourceToShortenedUrlMapping[url] != undefined) {
    return `${urlShortenerConfig.baseUrl}${sourceToShortenedUrlMapping[url]}`;
  }
  const shortenedUrl = uuidv4();
  sourceToShortenedUrlMapping[url] = shortenedUrl;
  shortenedToSourceUrlMapping[shortenedUrl] = url;
  return `${urlShortenerConfig.baseUrl}${shortenedUrl}`;
};

const urlRedirectService = async (url) => {
  //extract id from url
  const id = url.split(urlShortenerConfig.baseUrl)[0];
  console.log(id);

  // check if redis cache contains mapping
  const cachedSourceUrl = await redisClient.get(id);
  if (cachedSourceUrl) {
    console.log("cache hit");
    return cachedSourceUrl;
  }

  // if not found , check in memory and add to redis cache for next ref
  if (shortenedToSourceUrlMapping[id] != undefined) {
    const sourceUrl = shortenedToSourceUrlMapping[id];
    await redisClient.setex(id, 86400, sourceUrl);
    console.log("cache miss");
    return sourceUrl;
  }
  return undefined;
};

module.exports = { urlShortenService, urlRedirectService };

// https://facebook.com/
// https://eg.com/shortendUrl
