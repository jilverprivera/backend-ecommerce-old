const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./database/databaseConfig");
// To set a enviroment variables.
require("dotenv").config();

const app = express();
app.use(express.json());

// Allows to set cookies on server.
app.use(cookieParser());

// Access control HTTP.
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes
app.use("/user", require("./routes/userRoute"));
app.use("/api", require("./routes/categoryRoute"));
app.use("/api", require("./routes/imageUpload"));
app.use("/api", require("./routes/productsRoute"));
app.use("/api", require("./routes/paymentRoutes"));

//Mongoose connect
connectDB();

//Server PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
