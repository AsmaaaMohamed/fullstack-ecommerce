const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { username, email,subject, message } = req.body;
  if (!username || !email || !subject || !message) {
    return next(new AppError('All fields are required', 400));
  }
  // send email here
  await sendEmail({
    username,
    email,
    subject,
    message,
  });
  res.status(200).json({
    status: 'success',
    message: 'Message sent successfully',
  });
});