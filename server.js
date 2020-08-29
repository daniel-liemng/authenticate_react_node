const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoute");

require("dotenv").config({ path: "./.env.development" });

const app = express();

// middleware
// app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// routes
app.use(authRoutes);

// cookies
// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "user=liem");
//   res.cookie("user", false);
//   res.cookie("user1", true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
//   res.send("set cookie");
// });
// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// });

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) =>
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT} and DB connected`)
    )
  )
  .catch((err) => console.error(err));
