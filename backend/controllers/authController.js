const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.register = catchAsync(async(req, res,next) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        status:"success",
        data:{
            user:newUser
        }
    });
});
exports.login = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};