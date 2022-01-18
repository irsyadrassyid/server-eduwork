const path = require("path");
const fs = require("fs");
const config = require("../config");
const Category = require("./model");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = new Category(payload);
    await category.save();
    return res.json(category);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

// ---- read ----

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;

    let category = await Category.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    return res.json(category);
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
    let category = await Category.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(category);
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
    let category = await Category.findByIdAndDelete(req.params.id);
    return res.json(category);
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
