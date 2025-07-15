const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
