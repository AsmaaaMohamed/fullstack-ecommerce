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
const wishlistRouter = require('./routes/wishlistRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://fullstack-ecommerce-front-nine.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser and same-origin requests without an Origin header.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
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
app.use('/api/wishlist', wishlistRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

app.all('/*splat', (req, res, next) => {
    next(new AppError(`This route ${req.originalUrl} is not yet defined!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
