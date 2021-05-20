//const ENV_CONFIG = require('./src/config')
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

require('dotenv').config();

const port = process.env.PORT || 3001;
app.use(compression());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, () => {
	console.log(`Admin Portal started at ${Date()} on Port ${port}`);
});
