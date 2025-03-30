const express = require("express");
const cors = require("cors");
const config = require("./config");
const connectMongo = require("./database/mongodb");
const router = require("./router");

class Server {
  constructor() {
    this.app = express();
    this.port = config.server.http.port;
    this.initMiddleware();
    this.initDatabase();
    this.initRoutes();
  }

  initMiddleware() {
    this.app.use(express.json()); // JSON parsing

    // Enable CORS if configured
    if (config.cors.enabled) {
      this.app.use(
        cors({
          origin: config.cors.origin,
          methods: config.cors.methods,
          allowedHeaders: config.cors.headers,
          credentials: config.cors.credentials,
        })
      );
    }
  }

  initDatabase() {
    connectMongo(); // Connect to MongoDB
  }

  initRoutes() {
    this.app.use("/", router); // Load all routes
  }

  start() {
    this.app.listen(this.port, () => {
		console.log(`Server is running on http://localhost:${this.port}`);
    });
  }

  getAppInstance() {
    return this.app;
  }
}

module.exports = Server;
