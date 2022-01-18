const path = require("path");
const fs = require("fs");
const config = require("../config");
const Product = require("./model");
const Category = require("../category/model");
const Tags = require("../tags/model");

// -- post --
const store = async (req, res, next) => {
  try {
    let payload = req.body;
    // -- relasi dengan kategori one to one --
    if (payload.category) {
      let category = await Category.findOne({
        name: { $regex: payload.category, $options: "i" },
      });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    // --relasi dengan tag one to many --
    if (payload.tag && payload.tag.length > 0) {
      let tag = await Tags.find({
        name: { $in: payload.tag },
      });
      if (tag) {
        payload = { ...payload, tag: tag.map((tag) => tag._id) };
      } else {
        delete payload.tag;
      }
    }

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];

      let filename = req.file.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/images/products/${filename}`
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          let product = new Product({ ...payload, image_url: filename });
          await product.save();
          return res.json(product);
        } catch (err) {
          fs.unlinkSync(target_path);
          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              fileds: err.errors,
            });
          }
          next(err);
        }
      });

      src.on("error", async () => {
        next(err);
      });
    } else {
      let product = new Product(payload);
      await product.save();
      return res.json(product);
    }
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
    let { skip = 0, limit = 10, q = "", category = "", tags = [] } = req.query;

    let criteria = {};

    if (q.length) {
      criteria = {
        ...criteria,
        name: { $regex: `${q}`, $options: "i" },
      };
    }

    if (category.length) {
      let criteriaResult = await Category.findOne({
        name: { $regex: `${category}`, $options: "i" },
      });
      if (criteriaResult) {
        criteria = { ...criteria, category: criteriaResult._id };
      }
    }
    if (tags.length) {
      let tagsResult = await Tags.find({ name: { $in: tags } });
      console.log(tags);
      if (tagsResult.length > 0) {
        criteria = {
          ...criteria,
          tags: { $in: tagsResult.map((tag) => tag._id) },
        };
        console.log(criteria);
      }
    }
    let count = await Product.find(criteria).countDocuments();
    let product = await Product.find(criteria)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("category")
      .populate("tags");

    return res.json({
      data: product,
      count,
    });
  } catch (err) {
    next(err);
  }
};
// --- UPDATE ---
const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let { id } = req.params;
    // -- relasi dengan kategori one to one --
    if (payload.category) {
      let category = await Category.findOne({
        name: { $regex: payload.category, $options: "i" },
      });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    // --relasi dengan tag one to many --
    if (payload.tag && payload.tag.length > 0) {
      let tag = await Tags.find({
        name: { $in: payload.tag },
      });
      if (tag) {
        payload = { ...payload, tag: tag.map((tag) => tag._id) };
      } else {
        delete payload.tag;
      }
    }

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];

      let filename = req.file.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/images/products/${filename}`
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          let product = await Product.findById(id);
          let carrentImage = `${config.rootPath}/public/images/products/${product.image_url}`;
          if (fs.existsSync(carrentImage)) {
            fs.unlinkSync(carrentImage);
          }

          product = await Product.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
          });
          return res.json(product);
        } catch (err) {
          fs.unlinkSync(target_path);
          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              fileds: err.errors,
            });
          }
          next(err);
        }
      });

      src.on("error", async () => {
        next(err);
      });
    } else {
      let product = new Product(payload);
      await product.save();
      return res.json(product);
    }
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

// -- delete --

const destroy = async (req, res, next) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    let carrentImage = `${config.rootPath}/pablic/images/products/${product.image_url}`;
    if (fs.existsSync(carrentImage)) {
      fs.unlinkSync(carrentImage);
    }

    return res.json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = { store, index, update, destroy };
