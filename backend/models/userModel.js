const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Name is required"],
        trim:true,
        minlength:[3,"Name must be at least 3 characters long"],
        maxlength:[50,"Name must be at most 50 characters long"]
    },
    email: {
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        unique:true,
        validate:[validator.isEmail,"Invalid email address"]
    },
    password: {
        type:String,
        required:[true,"Password is required"],
        trim:true,
        minlength:[6,"Password must be at least 6 characters long"],
        maxlength:[50,"Password must be at most 50 characters long"]
    },
});
module.exports = mongoose.model("User", userSchema);