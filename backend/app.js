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
app.all('/*splat', (req, res, next) => {
    const err = new Error(`This route ${req.originalUrl} is not yet defined!`);
    err.statusCode = 404;
    err.status = 'fail';
    next(err);
});
app.use((err, req, res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});
module.exports = app;