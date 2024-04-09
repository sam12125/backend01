const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Data = require("./Model/Data");
const cors = require("cors"); // Import the cors module

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://saiyamvaid:9760888906@cluster0.oxonx3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Count API calls
let addCount = 0;
let updateCount = 0;

// Add data
app.post("/api/add", async (req, res) => {
  try {
    addCount++;
    const { title, content } = req.body;
    const newData = new Data({ title, content });
    await newData.save();
    res.json({ success: true, message: "Data added successfully", newData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update data
app.put("/api/update/:id", async (req, res) => {
  try {
    updateCount++;
    const { title, content } = req.body;
    const dataId = req.params.id;
    await Data.findByIdAndUpdate(dataId, { title, content });
    res.json({ success: true, message: "Data updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all data
app.get("/api/data", async (req, res) => {
  try {
    const allData = await Data.find();
    res.json({ success: true, data: allData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/count", (req, res) => {
  res.json({ addCount, updateCount });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
