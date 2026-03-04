const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const signToken = require("../utils/jwtHelper");

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
  const refreshToken = signToken(user._id, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRES_IN);
  const cookieOptions = {
    httpOnly: true,     //allows cookie to be sent only in HTTP requests, not accessible via JavaScript
    secure: false,      // IMPORTANT for localhost
    sameSite: 'Lax',     // IMPORTANT for different ports
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000, // Convert days to milliseconds
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', refreshToken, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
}
exports.refresh = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.status(401).json({ message: 'Unauthorized' });
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      const foundUser = await User.findById(decoded.id).exec();
      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
      const token = signToken(foundUser._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
      console.log("New access token generatedffffffffffffffffffffffffff");
      res.json({ token });
    }
  );
};
exports.register = catchAsync(async(req, res,next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
});
exports.login = catchAsync(async(req, res,next) => {
    const {email , password} = req.body;
    // check if email and password are provided
    if(!email || !password){
        return next(new AppError("Please provide email and password",400));
    }
    // check if user exists && password is correct
    const user = await User.findOne({email}).select("+password");
    //console.log(user);
    // check if user exists && password is correct (we need to do it as this so it only check password if user exists to prevent get error of using user when it is null)
    if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError("Invalid email or password",401));
    }
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
});
exports.logout = (req, res,next) => {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax'
    });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};
