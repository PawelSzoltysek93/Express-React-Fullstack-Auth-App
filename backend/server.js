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
const AVATAR_DIR = "./uploads/avatar";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, AVATAR_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

function readUsers() {
  const data = fs.readFileSync("./users.json", "utf-8");
  return JSON.parse(data);
}

app.post("/register", upload.single("avatar"), (req, res) => {
  const { name, email, password, job, dob } = req.body;
  const avatarPath = req.file ? `/uploads/avatar${req.file.filename}` : "";
  const users = readUsers();
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
