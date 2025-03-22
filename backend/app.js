const express = require("express");
const app = express();
const dbgr = require("debug")("development:main");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const main = require("./config/db.config");
main()
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*", // Allow requests only from your frontend
    credentials: true, // Allow cookies & authorization headers
  })
);

//routes
const indexRouter = require("./routes/index.route");
const ownersRouter = require("./routes/owners.route");
const usersRouter = require("./routes/users.route");
const productsRouter = require("./routes/products.route");
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen("8080", (req, res) => {
  console.log("Server is running on port 8080");
});
