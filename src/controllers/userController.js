const userModel = require("../models/user");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async (req, res) => {
  //existing user check
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //hashed password
    const hashedPassword = await bcyrpt.hash(password, 10);
    //user creation
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    //token genrate
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massege: "Something went wrong" });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //for check user signin
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    //bcyrpted password match condition
    const matchPassword = await bcyrpt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    //token genrate
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massege: "Something went wrong" });
  }
};

module.exports = { signin, signup };
