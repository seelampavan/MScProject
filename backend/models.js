const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  age: String,
  gender: String,
});

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  question: String,
});

const replySchema = new mongoose.Schema({
  reply: String,
  questionId: mongoose.Schema.Types.ObjectId,
});

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  moduleName: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

const TimeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  timeSpent: { type: Number, required: true }, // time spent in minutes
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Training: mongoose.model("Training", trainingSchema),
  Question: mongoose.model("Question", questionSchema),
  Reply: mongoose.model("Reply", replySchema),
  Progress: mongoose.model("Progress", ProgressSchema),
  Time: mongoose.model("Time", TimeSchema),
};
