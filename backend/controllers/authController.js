const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
}
exports.register = catchAsync(async(req, res,next) => {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);
    res.status(201).json({
        status:"success",
        token,
        data:{
            user:newUser
        }
    });
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
    // if everything is correct, send token to client
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token,
        data:{
            user
        }
    });
});
exports.logout = catchAsync(async(req, res,next) => {
   res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
});
