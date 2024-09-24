const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shakeabhi403:PF7AzgxuIbu06vC9@cluster0.wzqqh9a.mongodb.net/Paytm")
.then(() => {
  console.log("Database connected successfully");
})
.catch((err) => {
  console.error("Database connection error:", err);
});

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  }
});

const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    balance: {
      type: Number,
      required: true
    }
  }
);

const Account = mongoose.model('Account', accountSchema);

module.exports = {
  User,
  Account,
};
