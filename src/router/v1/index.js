const express = require('express');
const urlRouter = require('../urls.router');
const v1Router = express.Router();


//health check api
v1Router.get('/health', (req, res) => {
    res.send('v1 server is healthy');
});

v1Router.use('/url', urlRouter)




module.exports = v1Router