const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.getHomeContent = (req, res) => {
  res.send("Hello world");
};
