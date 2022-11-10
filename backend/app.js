const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// select config.env if app is in dev mode
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./backend/Config/config.env" });
} else {
  // if app on production use build index file as root
  app.use(express.static("./frontend/build"));
  const path = this.request("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
  });
}

app.get("/", (req, res) => {
  res.json("server running");
});
//all routes here
app.use("/api/user", require("./Routes/userRouter"));
// app.use('/api',     'api')
app.use("/api/adCard", require("./Routes/adcardRouter"));
module.exports = app;
