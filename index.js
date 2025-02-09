const app = require('./src/app')
const config = require('./src/config')
const port = config.server.http.port;


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});