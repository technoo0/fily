require("dotenv").config();

const express = require("express");
const passport = require("passport");
const mainRoute = require("./routes/index");
const userRoute = require("./routes/user");
const GoogleRoute = require("./routes/google");
const TwitterRoute = require("./routes/twitterRoute");
const FilesRoute = require("./routes/Files");
const UploadRoute = require("./routes/upload");
const ops = require("./routes/ops");
const ShareLink = require("./routes/ShareLink");
const session = require("./config/session");
var cors = require("cors");
const app = express();
app.use(cors({ origin: "*", credentials: true }));

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./config/passport");
require("./config/Google");
require("./config/Twitter");

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRoute);
app.use("/u/", userRoute);
app.use("/auth/google", GoogleRoute);
app.use("/auth/twitter", TwitterRoute);
app.use("/get/", FilesRoute);
app.use("/upload/", UploadRoute);
app.use("/ops/", ops);
app.use("/ShareLink/", ShareLink);

app.listen(process.env.PORT || 4000);
