import { secret } from "../config/auth.config";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { response } from "express";
export const signup = (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    token: "",
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  });
};
export const signin = (req, res) => {
  console.log(req.body);
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = req.body.password === user.password;
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400, // 24 hours
    });
    User.findOneAndUpdate({ username: user.username }, { token: token }).exec(
      (err, user) => {
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: user.token,
        });
      }
    );
  });
};
export const tokenreCheck = (req, res) => {
  console.log(req.body);
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.status(200).send({
      username: user.username,
      password: user.password,
      email: user.email,
      accessToken: user.token,
    });
  });
};
export const tokenremove = (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate({ username: req.body.username }, { token: "" }).exec(
    (err, user) => {
      res.status(200).send("token removed");
    }
  );
};
