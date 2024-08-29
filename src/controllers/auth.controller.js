const jwtProvider = require("../config/jwtProvider");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Retailer = require("../models/retailer.model");
const DeliveryBoy = require("../models/deliveryBoy.model");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  try {
    let { name, email, password, mobile, referrel } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists with this Email");
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      name,
      email,
      mobile,
      referrel: referrel || "",
      password: hashedPassword,
    });

    const jwt = jwtProvider.generateToken(newUser._id, "user");
    return res.status(200).send({ jwt, message: "register success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deliveryBoySignup = async (req, res) => {
  try {
    let { name, email, password, mobile, referrel } = req.body;
    const isUserExist = await DeliveryBoy.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists with this Email");
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    const newDeliveryBoy = await DeliveryBoy.create({
      name,
      email,
      mobile,
      referrel: referrel || "",
      password: hashedPassword,
    });

    const jwt = jwtProvider.generateToken(newDeliveryBoy._id, "deliveryBoy");
    return res.status(200).send({ jwt, message: "register success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const retailerSignup = async (req, res) => {
  try {
    let { name, email, password, mobile, referrel } = req.body;
    const isUserExist = await Retailer.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists with this Email");
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    const newRetailer = await Retailer.create({
      name,
      email,
      mobile,
      referrel: referrel || "",
      password: hashedPassword,
    });

    const jwt = jwtProvider.generateToken(newRetailer._id, "retailer");
    return res.status(200).send({ jwt, message: "register success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email, checkBoxValue } = req.body;

  try {
    let user;
    if (checkBoxValue.toString() === "deliveryBoy") {
      console.log("Delivery Boy Signin form Invoked ")
      user = await DeliveryBoy.findOne({ email });
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).send({ error: "Invalid password" });
      }

      const jwt = jwtProvider.generateToken(user._id, checkBoxValue.toString());
      return res.status(200).send({ jwt, message: "login success" });

    } else if (checkBoxValue.toString() === "retailer") {
      console.log("Retailer Boy Signin form Invoked ")
      user = await Retailer.findOne({ email });
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).send({ error: "Invalid password" });
      }

      const jwt = jwtProvider.generateToken(user._id, checkBoxValue.toString());
      return res.status(200).send({ jwt, message: "login success" });

    } else {
      console.log("User Boy Signin form Invoked ")
      user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).send({ error: "Invalid password" });
      }

      const jwt = jwtProvider.generateToken(user._id, checkBoxValue.toString());
      return res.status(200).send({ jwt, message: "login success" });
    }
  } catch (error) {
    console.log("Error in login ", error.message);
    return res.status(500).send({ error: error.message });
  }
};

const getUserRoleFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    // console.log(decodedToken)
    // console.log(decodedToken, "Decoded Token:"); // Check if this logs correctly
    return decodedToken.role;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Error: Token expired");
      return error.message
    } else if (error.name === "JsonWebTokenError") {
      console.error("Error: JWT malformed");
      return error.message
    } else {
      console.error("Error verifying token:", error.message);
      return error.message
    }
  }
};

module.exports = {
  userSignup,
  deliveryBoySignup,
  retailerSignup,
  login,
  getUserRoleFromToken,
};
