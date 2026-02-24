const express = require('express');
const path = require('path')
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');
const contactRouter = require('./routes/contactRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const cors = require('cors');

const app = express();

app.use(cors()); // Allows all origins
app.use(express.json());
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// ROUTES
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/contact', contactRouter);

app.all('/*splat', (req, res, next) => {
    next(new AppError(`This route ${req.originalUrl} is not yet defined!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;