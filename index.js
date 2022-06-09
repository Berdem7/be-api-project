const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dayjs = require("dayjs");

const cookieParser = require("cookie-parser");

const apiRoutes = require("./routes/api");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/cookies", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Content-Type", "application/json");
  next();
});

app.post("/cookies", (req, res) => {
  const dataToSecure = req.body;
  res.cookie((secureCookie = JSON.stringify(dataToSecure)), {
    secure: true,
    httpOnly: true,
    expires: dayjs().add(30, "days").toDate(),
  });
  res.send("Cookie added");
  console.log("successsss");
});

app.use("/api", apiRoutes, (res, req, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Content-Type", "application/json");
  next();
});

console.log(process.env.ATLAS_CONNECTION_URL);

mongoose
  .connect(process.env.ATLAS_CONNECTION_URL, { useNewUrlParser: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.listen(process.env.PORT, () => {
  console.log("Application is started on PORT = " + process.env.PORT);
});
