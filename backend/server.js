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
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

if (!fs.existsSync("./users.json")) {
  fs.writeFileSync("./users.json", JSON.stringify([]), "utf-8");
}

if (!fs.existsSync(AVATAR_DIR)) {
  fs.mkdirSync(AVATAR_DIR, { recursive: true });
}

function readUsers() {
  const data = fs.readFileSync("./users.json", "utf-8");
  return JSON.parse(data);
}
function writeUsers(users) {
  fs.writeFileSync("./users.json", JSON.stringify(users), "utf-8");
}

app.post("/register", upload.single("avatar"), (req, res) => {
  const { name, email, password, job, dob } = req.body;
  const avatarPath = req.file ? `/uploads/avatar/${req.file.filename}` : "";
  const users = readUsers();
  if (users.find((user) => user.email === email)) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ message: "Email already exists" });
  }

  users.push({
    id: Date.now(),
    name,
    email,
    password,
    job,
    dob,
    avatar: avatarPath,
  });
  writeUsers(users);
  res.json({ message: "User registered succesfuly" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ message: "Login succesfully" });
});
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
