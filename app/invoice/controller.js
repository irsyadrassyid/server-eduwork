const Invoice = require("./model");
const { subject } = require("@casl/ability");
const { policyFor } = require("../../utils");

const show = async (req, res, next) => {
  try {
    let { order_id } = req.params;
    let invoice = await Invoice.findOne({ order: order_id })
      .populate("order")
      .populate("user");

    let police = policyFor(req.user);
    let subjectInvoice = subject("Invoice", {
      ...invoice,
      user_id: invoice.user._id,
    });

    if (!police.can("read", subjectInvoice)) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki hak akses",
      });
    }
    return res.json(invoice);
  } catch (err) {
    if (err) {
      return res.json({
        error: 1,
        message: err.message,
      });
    }
    next(err);
  }
};

module.exports = { show };
