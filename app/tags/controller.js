const path = require("path");
const fs = require("fs");
const config = require("../config");
const Tags = require("./model");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let tag = new Tags(payload);
    await tag.save();
    return res.json(tag);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fileds: err.errors,
      });
    }
    next(err);
  }
};

// ---- read ----

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;

    let tag = await Tags.find().skip(parseInt(skip)).limit(parseInt(limit));

    return res.json(tag);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fileds: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let tag = await Tags.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(tag);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fileds: err.errors,
      });
    }
    next(err);
  }
};

// -- delete --

const destroy = async (req, res, next) => {
  try {
    let tag = await Tags.findByIdAndDelete(req.params.id);
    return res.json(tag);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fileds: err.errors,
      });
    }
    next(err);
  }
};

module.exports = { store, index, update, destroy };
