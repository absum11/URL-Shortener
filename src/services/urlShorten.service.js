const { v4: uuidv4 } = require("uuid");
const { urlShortenerConfig } = require("../config");

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

const urlRedirectService = (url) => {
  const id = url.split(urlShortenerConfig.baseUrl)[0];
  console.log(id);
  console.log("gullu");
  if (shortenedToSourceUrlMapping[id] != undefined) {
    return shortenedToSourceUrlMapping[id];
  }
  return undefined;
};

module.exports = { urlShortenService, urlRedirectService };

// https://facebook.com/
// https://eg.com/shortendUrl
