const { subject } = require("@casl/ability");
const { police_check } = require("../../middleware");
const { policyFor } = require("../../utils");
const DeleveryAddress = require("./model");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = req.user;
    let address = new DeleveryAddress({ ...payload, user: user._id });
    await address.save();
    return res.json(address);
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

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;

    let address = await DeleveryAddress.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    return res.json(address);
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
    let { _id, ...payload } = req.body;
    let { id } = req.params;
    let address = await DeleveryAddress.findById(id);

    subjectAddress = subject("DeleveryAddress", {
      ...address,
      user_id: address.user,
    });
    police = policyFor(req.user);
    if (!police.can("update", "DeleveryAddress")) {
      return res.json({
        error: 1,
        message: "you`re not allowed to modify this resource",
      });
    }

    address = await DeleveryAddress.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return res.json(address);
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

const destroy = async (req, res, next) => {
  try {
    let { id } = req.params;
    let address = await DeleveryAddress.findById(id);

    subjectAddress = subject("DeleveryAddress", {
      ...address,
      user_id: address.user,
    });
    police = policyFor(req.user);
    if (!police.can("delete", "DeleveryAddress")) {
      return res.json({
        error: 1,
        message: "you`re not allowed to modify this resource",
      });
    }

    address = await DeleveryAddress.findByIdAndDelete(id);
    res.json(address);
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
