const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    unique: [true, "Email already exists"],
  },
  name: {
    type: String,
    required: [true, "Name is required for creating an account"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  systemUser: {
    type: Boolean,
    default: false,
    immutable: true,
    select: false,
  }
}, {
    timestamps: true,
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User