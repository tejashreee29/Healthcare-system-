require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to SQLite Database
const db = new sqlite3.Database('./healthcare.db', (err) => {
  if (err) console.error('❌ Database error:', err.message);
  else console.log('✅ Connected to SQLite database.');
});

// ✅ Ensure Users Table Exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT, 
  gender TEXT,
  mobile TEXT,
  age INTEGER
)`);

// ✅ Ensure Medical History Table Exists
db.run(`CREATE TABLE IF NOT EXISTS medical_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  chronic_conditions TEXT,
  allergies TEXT,
  medications TEXT,
  past_surgeries TEXT,
  height INTEGER,
  weight INTEGER,
  blood_group TEXT,
  lifestyle TEXT,
  additional_info TEXT,
  FOREIGN KEY(userId) REFERENCES users(id)
)`);

// ✅ Ensure Chat History Table Exists
db.run(`CREATE TABLE IF NOT EXISTS chat_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  message TEXT,
  response TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// ✅ Initialize Google Gemini AI with Latest Model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ SIGNUP Route
app.post('/signup', async (req, res) => {
  const { name, email, password, gender, mobile, age } = req.body;
  if (!name || !email || !password || !gender || !mobile || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      "INSERT INTO users (name, email, password, gender, mobile, age) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, gender, mobile, age],
      function (err) {
        if (err) {
          console.error("❌ Signup error:", err.message);
          return res.status(400).json({ message: "Email already exists" });
        }
        res.json({ message: "Signup successful", userId: this.lastID });
      }
    );
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ LOGIN Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      console.error("❌ Database error:", err.message);
      return res.status(500).json({ message: "Server error" });
    }
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid email or password" });

    res.json({ message: "Login successful", userId: user.id });
  });
});

// ✅ SUBMIT MEDICAL HISTORY Route
app.post('/submit-medical-history', (req, res) => {
  const { userId, chronicConditions, allergies, medications, pastSurgeries, height, weight, bloodGroup, lifestyle, additionalInfo } = req.body;
  if (!userId) return res.status(400).json({ message: "User ID is required" });

  db.run(
    "INSERT INTO medical_history (userId, chronic_conditions, allergies, medications, past_surgeries, height, weight, blood_group, lifestyle, additional_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [userId, chronicConditions, allergies, medications, pastSurgeries, height, weight, bloodGroup, lifestyle, additionalInfo],
    function (err) {
      if (err) {
        console.error("❌ Medical History Error:", err.message);
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "Medical history saved successfully!" });
    }
  );
});

// ✅ AI CHATBOT Route (Google Gemini)
app.post('/chatbot', async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ message: "User ID and message are required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Use the latest model
    const result = await model.generateContent(message);

    // ✅ Correct way to extract the text from the latest Gemini API response
    const aiReply = result.response.candidates[0].content.parts[0].text;

    // ✅ Save chat history to the database
    db.run(
      "INSERT INTO chat_history (userId, message, response) VALUES (?, ?, ?)",
      [userId, message, aiReply]
    );

    res.json({ reply: aiReply });

  } catch (error) {
    console.error("❌ Google Gemini API Error:", error);
    res.status(500).json({
      reply: "⚠️ AI is temporarily unavailable. Please try again later."
    });
  }
});

// ✅ Start Server
app.listen(3000, () => console.log('🚀 Server running on port 3000'));
