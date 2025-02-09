const {
  urlShortenService,
  urlRedirectService,
} = require("../services/urlShorten.service");

const urlShortenController = (req, res) => {
  const result = urlShortenService(req.body.url);
  console.log(result);
  return res.status(200).json({
    shortenedUrl: result,
  });
};

const urlRedirectController = (req, res) => {
  const result = urlRedirectService(req.params.id);
  if (result === undefined) {
    res.status(404).json({
      msg: "url not found",
    });
  }
  // caches result in the browser so next time req does not come to server
  res.redirect(301, result);
};

module.exports = { urlShortenController, urlRedirectController };
