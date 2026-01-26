const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);
