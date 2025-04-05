const {
	urlShortenService,
	urlRedirectService
} = require("../services/urlShorten.service");

const urlShortenController = async (req, res) => {
	const result = await urlShortenService(req.body.url);
	console.log(result);
	return res.status(200).json({
		shortenedUrl: result
	});
};

const urlRedirectController = async (req, res) => {
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
