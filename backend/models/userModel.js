const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
        maxlength:[50,"Password must be at most 50 characters long"],
        select:false
    },
});
userSchema.pre("save",async function(){
    // only run this function if password was actually modified
    if(!this.isModified("password")) return;
    // hash the password with cost of 12
    this.password = await bcrypt.hash(this.password,12);
});
userSchema.methods.correctPassword = async function(password,hashedPassword){
    return await bcrypt.compare(password,hashedPassword);
}

module.exports = mongoose.model("User", userSchema);