import { secret } from "../config/auth.config";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
var token = "";
export const signup = (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
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
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
};
export const tokenreCheck = (req, res) => {
  console.log(req.body.token);
  jwt.verify(req.body.token, secret, (err, verifiedJwt) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send({ authorized: true });
    }
  });
};
