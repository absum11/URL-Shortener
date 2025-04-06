const {
	urlShortenService,
	urlRedirectService
} = require("../services/urlShorten.service");

const urlShortenController = async (req, res) => {
	const { longUrl } = req.body;
	const userId = req.user?.userId;

	const result = await urlShortenService(longUrl, userId);
	console.log(result);
	return res.status(201).json({
		shortenedUrl: result
	});
};

const urlRedirectController = async (req, res) => {
	console.log(req.params.id);
	const result = await urlRedirectService(req.params.id);
	if (result === undefined) {
		return res.status(404).json({
			msg: "url not found"
		});
	}
	// caches result in the browser so next time req does not come to server
	return res.redirect(301, result);
};

module.exports = { urlShortenController, urlRedirectController };
