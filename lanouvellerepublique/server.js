'use strict';

const express = require('express');
const path = require('path');

const app = express();

// Serve the Vite build output (dist/ folder)
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// SPA fallback: serve index.html for all non-file routes (Vue Router history mode)
app.use(function (req, res) {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app;

// npm install && npm run build
