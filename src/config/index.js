const fs = require("fs");
const yaml = require("yaml");

// Load config.yaml
const file = fs.readFileSync("config.yaml", "utf8");
const config = yaml.parse(file);

module.exports = {
  server: {
    env: config.server.env,
    http: {
      port: config.server.http.port,
    },
  },
  urlShortenerConfig: {
    baseUrl: config.url_shortener.base_url,
    blackList: {
      domains: config.url_shortener.black_list.domains,
    },
  },
  cors: {
    enabled: config.cors.enabled,
    origin: config.cors.origin,
    methods: config.cors.methods,
    headers: config.cors.headers,
    credentials: config.cors.credentials,
  },
  redis:{
    host: config.redis.host,
    port: config.redis.port
  }
};
