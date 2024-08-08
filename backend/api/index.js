const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");

const connectToDatabase = require("../db");
const {
  User,
  Training,
  Question,
  Reply,
  Progress,
  Time,
} = require("../models");

connectToDatabase();
const server = express();
server.use(bodyParser.json());
server.use(cors());

server.post("/api/auth/google", async (req, res) => {
  const { username, email, googleId, age, gender } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ googleId });
    if (existingUser) {
      return res.json({
        message: "User already exists. Please Login",
        user: existingUser,
      });
    }
    const user = new User({
      username,
      email,
      googleId,
      age,
      gender,
    });
    await user.save();
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

server.post("/api/auth/signup", async (req, res) => {
  const { username, email, password, age, gender } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    const existingUserName = await User.findOne({ username });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    if (existingUserName) {
      return res.json({ message: "Username already exists" });
    }
    const user = new User({
      username,
      email,
      password: hashedPassword,
      age,
      gender,
    });
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

server.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Invalid password" });
    }
    res.json({ user });
  } catch (error) {
    res.json({ message: error });
  }
});

server.post("/training", async (req, res) => {
  const { name, age, gender } = req.body;
  console.log(req.body);
  try {
    const existingTraining = await Training.findOne({ name });
    if (existingTraining) {
      return res.json({
        message: "Training already exists. Please Login",
        training: existingTraining,
      });
    }
    const training = new Training({
      name,
      age,
      gender,
    });
    await training.save();
    res.json(training);
  } catch (error) {
    res.json({ message: error });
  }
});

server.post("/question", async (req, res) => {
  const { question } = req.body;
  console.log(req.body);

  try {
    const newQuestion = new Question({ question });
    await newQuestion.save();
    res.json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save question", error });
  }
});

server.post("/reply", async (req, res) => {
  const { questionId, reply } = req.body;
  console.log(req.body);

  try {
    const newReply = new Reply({ questionId, reply });
    await newReply.save();
    res.json(newReply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save reply", error });
  }
});

server.post("/progress", async (req, res) => {
  const { userId, moduleName, progress, total } = req.body;
  console.log(req.body);
  try {
    let progressRecord = await Progress.findOne({ userId, moduleName });
    if (progressRecord) {
      progressRecord.progress = progress;
      progressRecord.total = total;
    } else {
      progressRecord = new Progress({ userId, moduleName, progress, total });
    }
    await progressRecord.save();
    res.status(200).json(progressRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.post("/time", async (req, res) => {
  const { userId, timeSpent, date } = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to the start of the day to compare only the date part

  try {
    // Find an existing record for the user for today
    let record = await Time.findOne({ userId, date: today });

    if (record) {
      // If record exists, update the time spent
      record.timeSpent += timeSpent;
    } else {
      // If no record exists, create a new record
      record = new Time({ userId, date: today, timeSpent });
    }

    await record.save();
    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save time", error });
  }
});

server.get("/time/:userId", async (req, res) => {
  const { userId } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to the start of the day to compare only the date part
  try {
    const records = await Time.find({ userId });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch time", error });
  }
});
// Get Progress
server.get("/progress/:userId/:moduleName", async (req, res) => {
  const { userId, moduleName } = req.params;
  console.log(req.params);
  try {
    const progress = await Progress.findOne({ userId, moduleName });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.get("/question", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch questions", error });
  }
});

server.get("/reply/:questionId", async (req, res) => {
  const { questionId } = req.params;
  try {
    const replies = await Reply.find({
      questionId,
    });
    res.json(replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch replies", error });
  }
});

server.get("/training", async (req, res) => {
  try {
    const training = await Training.find();
    res.json(training);
  } catch (error) {
    res.json({ message: error });
  }
});

server.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
