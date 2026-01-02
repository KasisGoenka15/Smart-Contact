const express = require("express");
const cors = require("cors");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", contactRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
