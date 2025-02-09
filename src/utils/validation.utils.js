const { urlShortenerConfig } = require("../config");
function isValidURL(url) {
  const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/.*)?$/;
  return pattern.test(url);
}

function isBlackListedDomain(url) {
  try {
    const parsedUrl = new URL(url); //to extract hostname reliably, returns error if url invalid
    const domain = parsedUrl.hostname;

    return urlShortenerConfig.blackList.domains.includes(domain);
  } catch (error) {
    return res.status(400).json({ error: "Invalid URL format." });
  }
}

module.exports = { isValidURL, isBlackListedDomain };
