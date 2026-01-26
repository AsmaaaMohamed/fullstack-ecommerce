const express = require('express');
const path = require('path')

const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;