const express = require('express');
const path = require('path')
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');
const contactRouter = require('./routes/contactRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const cors = require('cors');
const passport = require('./config/passport');
const authRouter = require('./routes/authRoutes');
const cookiesParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // your frontend
    credentials: true
  })); // Allows all origins
app.use(cookiesParser());
app.use(express.json());
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
// ROUTES
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);

app.all('/*splat', (req, res, next) => {
    next(new AppError(`This route ${req.originalUrl} is not yet defined!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;