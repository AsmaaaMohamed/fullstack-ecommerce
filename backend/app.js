const express = require('express');
const path = require('path')
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const cors = require('cors')
const app = express();

app.use(cors()); // Allows all origins
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// ROUTES
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
module.exports = app;