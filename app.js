//app.js
const express = require("express");
const app = express();
const data = require('./paths/data')

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Converge Lite!");
});

app.use('/data', data)

module.exports = app;