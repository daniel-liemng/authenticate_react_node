const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoute");

require("dotenv").config({ path: "./.env.development" });

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/", authRoutes);

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
