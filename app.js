var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var productRoute = require("./app/product/router");
var categoryRoute = require("./app/category/router");
var tagsRoute = require("./app/tags/router");
var authRoute = require("./app/auth/router");
var devRoute = require("./app/deleveryAddress/router");
var cartRoute = require("./app/cart/router");
var orderRoute = require("./app/order/router");
var invoiceRoute = require("./app/invoice/router");
var addressRoute = require("./app/deleveryAddress/router");
var { decodeToken } = require("./middleware");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(decodeToken());

app.use("/auth", authRoute);
app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", tagsRoute);
app.use("/api", devRoute);
app.use("/api", cartRoute);
app.use("/api", orderRoute);
app.use("/api", invoiceRoute);
app.use("/api", addressRoute);

// HOME
app.use("/", (req, res) => {
  res.render("index", {
    title: "eduwork-store",
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
