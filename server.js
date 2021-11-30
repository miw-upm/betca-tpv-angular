const PATH_PROJECT = '/dist/betca-tpv-angular';
const express = require('express');
const app = express();

const http = require('http');
const path = require('path');
const server = http.createServer(app);

app.use(express.static(__dirname + PATH_PROJECT));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, PATH_PROJECT, index.html)));

server.listen(process.env.PORT || 8080, () => {
  if (!process.env.PORT) {
    console.log('Running with Express... http://localhost:8080/');
  }
});
