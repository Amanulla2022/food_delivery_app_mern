const express = require("express");
const dotenv = require("dotenv");
const connectToDataBase = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectToDataBase();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port - ${PORT}`);
});
