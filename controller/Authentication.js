const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
const express = require("express");
const cookie = require("cookie");

const router = express.Router();

const register = async (req, res, next) => {
  const data = req.body;
  const oldUser = await Users.findOne({ email: data.email });
  if (oldUser) {
    return res.status(400).json({
      success: false,
      status: "Email is already registered.",
    });
  } else {
    // const hashedPass = await bcrypt.hash(data.password, 10);
    data.password = bcrypt.hashSync(data.password, 10);
    // data.password = hashedPass;
    data.role == 0 ? (data.role_id = 1) : (data.role_id = data.role_id);
    data.created_date = Date("Y-m-d");
    data.last_activity = Date("Y-m-d");

    // Users.create(data).then((data) => {
    //   email = data.email;
    //   const token = jwt.sign(
    //     {
    //       user_id: data._id,
    //       email,
    //     },
    //     process.env.TOKEN_KEY,
    //     {
    //       expiresIn: "2h",
    //     }
    //   );
    //   res.status(200).json({
    //     success: true,
    //     data: data,
    //     token: token,
    //   });
    //   return;
    // });
    // const encryptedPassword = bcrypt.hashSync(data.password, 10);
    let newUser = new Users({
      _id: mongoose.Types.ObjectId(),
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role_id: data.role,
      created_date: data.created_date,
      last_activity: data.last_activity,
    });
    newUser
      .save()
      .then((data) => {
        email = data.email;
        const token = jwt.sign(
          {
            user_id: data._id,
            email,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          success: true,
          data: data,
          token: token,
        });
        return;
      })
      .catch(next);

    // res.send("Success");
  }
};

const login = async (req, res, next) => {
  // console.log(req.cookie);
  const data = req.body;
  if (data.email && data.password) {
    const oldUser = await Users.findOne({ email: data.email });
    userPass = bcrypt.hashSync(data.password, 10);
    if (!oldUser) {
      return res.status(400).json({
        success: false,
        status: "Email is not registered.",
      });
    } else {
      if (await bcrypt.compare(data.password, oldUser.password)) {
        email = oldUser.email;
        data.password = userPass;
        const token = jwt.sign(
          { user_id: oldUser._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // res.setHeader(
        //   "Set-Cookie",
        //   cookie.serialize("foo", "bar", { httpOnly: true })
        // );
        res.status(200).json({
          success: true,
          data: oldUser,
          token: token,
        });
        res.cookie("user", "Byambaa", {
          sameSite: "strict",
          // path: "/",
          expires: new Date(new Date().getTime() + 30 * 1000),
        });
        // let dataToSecure = {
        //   data: oldUser,
        //   token: token,
        // };
        // res.status(200);
        // res.cookie("name", "tobi", {
        //   domain: ".example.com",
        //   path: "/admin",
        //   secure: true,
        // });
        // router.post("/cookies", dataToSecure, (req, res, next) => {
        //   if (err) throw err;
        //   console.log("Success cookie");
        // });
        // res.setHeader('Set-Cookie', cookie.serialize('user', String(dataToSecure), {
        //   httpOnly: true,
        //   maxAge: 60 * 60 * 24 * 7 // 1 week
        // }));
        return;
      } else {
        return res.status(400).json({
          success: false,
          status: "Password is not matching.",
        });
      }
    }
  } else {
    return res.status(400).json({
      success: false,
      status: "Please fill the fields.",
    });
  }
};

module.exports = { register, login };
