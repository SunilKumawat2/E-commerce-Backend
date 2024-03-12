const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");

const MONO_URL = process.env.MONGO_URL
const mongodb = mongoose
  .connect(MONO_URL)
  .then(() => {
    // console.log("Connected to Mongo Db Database");
    console.log("Connected to The E-commerce Database",MONO_URL);
  })
  .catch(() => {
    console.log("not connected To Database");
  });

module.exports = mongodb;
