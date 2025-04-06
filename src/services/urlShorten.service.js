const { nanoid } = require("nanoid");
const { urlShortenerConfig } = require("../config");
const redisClient = require("../database/redis");
const { UrlStore } = require("../database/mongodb/url-model");

const urlShortenService = async (longUrl) => {
	// check if url exists in db
	const existingUrl = await UrlStore.findOne({ longUrl });
	if (existingUrl) {
		return `${urlShortenerConfig.baseUrl}${existingUrl.shortId}`;
	}

	// create entry in collection if not found
	try {
		const shortId = nanoid(10);
		const result = await UrlStore.create({ shortId, longUrl });
		console.log("Inserted into MongoDB:", result);
		return `${urlShortenerConfig.baseUrl}${shortId}`;
	} catch (error) {
		console.error("MongoDB Insert Error:", error);
	}
};

const urlRedirectService = async (shortId) => {

	// check if redis cache contains mapping
	const cachedSourceUrl = await redisClient.get(shortId);
	if (cachedSourceUrl) {
		console.log("cache hit");
		return cachedSourceUrl;
	}

	// if not found , check in database and add to redis cache for next ref
	const source = await UrlStore.findOne({ shortId });
	if (source) {
		// const sourceUrl = shortenedToSourceUrlMapping[shortId];
		await redisClient.setex(shortId, 86400, source.longUrl);
		console.log("cache miss");
		return source.longUrl;
	}
	return undefined;
};

module.exports = { urlShortenService, urlRedirectService };
