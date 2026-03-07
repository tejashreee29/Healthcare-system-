require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Initialize AI APIs
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

// ✅ Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// ✅ Ensure Appointments Table Exists
db.run(`CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  doctorName TEXT,
  date TEXT,
  time TEXT,
  reason TEXT,
  status TEXT DEFAULT 'PENDING',
  FOREIGN KEY(userId) REFERENCES users(id)
)`);

// ✅ Ensure Medical Records Table Exists
db.run(`CREATE TABLE IF NOT EXISTS medical_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  filename TEXT,
  originalName TEXT,
  fileType TEXT,
  fileSize INTEGER,
  analysis TEXT,
  uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(userId) REFERENCES users(id)
)`);

// ✅ Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ✅ Ensure Medications Table Exists
db.run(`CREATE TABLE IF NOT EXISTS medications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  name TEXT,
  dosage TEXT,
  schedule TEXT,
  instructions TEXT,
  lastTaken TEXT,
  FOREIGN KEY(userId) REFERENCES users(id)
)`);


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

  console.log(`🤖 AI Request from user ${userId}: "${message}"`);

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.includes('your_api_key')) {
      console.error("❌ AI Error: GEMINI_API_KEY is not set correctly in .env");
      throw new Error('MISSING_API_KEY');
    }

    // ✅ TRY GROQ FIRST (IF KEY EXISTS)
    if (groq) {
      console.log("🚀 Using Groq AI...");
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "llama-3.3-70b-versatile",
      });
      aiReply = completion.choices[0].message.content;
    }
    // ✅ FALLBACK TO GEMINI
    else {
      console.log("🚀 Using Gemini AI...");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(message);
      const response = await result.response;
      aiReply = response.text();
    }

    if (!aiReply) {
      console.error("❌ AI Error: Empty response from Gemini");
      throw new Error('EMPTY_RESPONSE');
    }

    console.log(`✅ AI Response: "${aiReply.substring(0, 50)}..."`);

    db.run(
      "INSERT INTO chat_history (userId, message, response) VALUES (?, ?, ?)",
      [userId, message, aiReply]
    );

    res.json({ reply: aiReply });

  } catch (error) {
    console.error("❌ AI EXCEPTION:", error);

    let userMsg = "⚠️ AI is temporarily unavailable.";
    const errorMsg = error.message || "";

    if (errorMsg.includes('MISSING_API_KEY')) {
      userMsg = "⚠️ AI API Key is missing. Please check your .env file.";
    } else if (errorMsg.includes('EMPTY_RESPONSE')) {
      userMsg = "⚠️ AI failed to generate a response. Please try a different question.";
    } else if (errorMsg.includes('429') || errorMsg.includes('quota')) {
      userMsg = "⏳ AI Busy (Rate limit reached). Google limits free tier usage. Please wait 1-2 minutes and try again!";
    } else if (errorMsg.includes('API_KEY_INVALID')) {
      userMsg = "⚠️ The provided AI API Key is invalid.";
    } else if (errorMsg.includes('limit')) {
      userMsg = "⚠️ AI quota exceeded for today. Please try again tomorrow or check your AI Studio limits.";
    }

    res.status(500).json({ reply: userMsg, debug: error.message });
  }
});

// ✅ GET MEDICATIONS Route
app.get('/medications/:userId', (req, res) => {
  const { userId } = req.params;
  db.all("SELECT * FROM medications WHERE userId = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows);
  });
});

// ✅ ADD MEDICATION Route
app.post('/medications', (req, res) => {
  const { userId, name, dosage, schedule, instructions } = req.body;
  db.run(
    "INSERT INTO medications (userId, name, dosage, schedule, instructions) VALUES (?, ?, ?, ?, ?)",
    [userId, name, dosage, schedule, instructions],
    function (err) {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({ message: "Medication added!", id: this.lastID });
    }
  );
});

// ✅ UPDATE MEDICATION DOSE Route
app.post('/medications/take', (req, res) => {
  const { medId } = req.body;
  const now = new Date().toLocaleString();
  db.run("UPDATE medications SET lastTaken = ? WHERE id = ?", [now, medId], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Dose recorded!", lastTaken: now });
  });
});

// ✅ BOOK APPOINTMENT Route
app.post('/appointments', (req, res) => {
  const { userId, doctorName, date, time, reason } = req.body;
  db.run(
    "INSERT INTO appointments (userId, doctorName, date, time, reason) VALUES (?, ?, ?, ?, ?)",
    [userId, doctorName, date, time, reason],
    function (err) {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({ message: "Appointment booked successfully", id: this.lastID });
    }
  );
});

// ✅ GET APPOINTMENTS Route
app.get('/appointments/:userId', (req, res) => {
  const { userId } = req.params;
  db.all("SELECT * FROM appointments WHERE userId = ? ORDER BY date DESC", [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows);
  });
});

// ✅ UPLOAD MEDICAL RECORD Route
app.post('/upload-record', upload.single('record'), (req, res) => {
  const { userId } = req.body;
  const file = req.file;

  if (!userId || !file) return res.status(400).json({ message: "User ID and file are required" });

  db.run(
    "INSERT INTO medical_records (userId, filename, originalName, fileType, fileSize) VALUES (?, ?, ?, ?, ?)",
    [userId, file.filename, file.originalname, file.mimetype, file.size],
    function (err) {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({
        message: "File uploaded!",
        record: { id: this.lastID, filename: file.filename, originalName: file.originalname, size: file.size }
      });
    }
  );
});

// ✅ GET MEDICAL RECORDS Route
app.get('/medical-records/:userId', (req, res) => {
  const { userId } = req.params;
  db.all("SELECT * FROM medical_records WHERE userId = ? ORDER BY uploadDate DESC", [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows);
  });
});

// ✅ ANALYZE MEDICAL RECORD Route (AI powered)
app.post('/analyze-record', async (req, res) => {
  const { recordId } = req.body;

  db.get("SELECT * FROM medical_records WHERE id = ?", [recordId], async (err, record) => {
    if (err || !record) return res.status(404).json({ message: "Record not found" });

    try {
      const filePath = path.join(__dirname, 'uploads', record.filename);
      const fileData = fs.readFileSync(filePath);

      let analysis = "";

      // ✅ TRY GROQ VISION (IF KEY EXISTS AND IMAGE)
      if (groq && record.fileType.includes('image')) {
        console.log("🚀 Analyzing Image with Groq Vision...");
        const base64Image = fileData.toString('base64');
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "Analyze this medical report. Identify the type of report (e.g. Blood Test, X-Ray) and summarize the findings. If there are any abnormal values or health risks, point them out clearly. Return a professional medical analysis summary." },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${record.fileType};base64,${base64Image}`,
                  },
                },
              ],
            },
          ],
          model: "llama-3.2-11b-vision-preview",
        });
        analysis = completion.choices[0].message.content;
      }
      // ✅ FALLBACK TO GEMINI
      else {
        console.log("🚀 Analyzing with Gemini...");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent([
          "Analyze this medical report. Identify the type of report (e.g. Blood Test, X-Ray) and summarize the findings. If there are any abnormal values or health risks, point them out clearly. Return a professional medical analysis summary.",
          {
            inlineData: {
              data: fileData.toString('base64'),
              mimeType: record.fileType
            }
          }
        ]);
        analysis = result.response.text();
      }

      db.run("UPDATE medical_records SET analysis = ? WHERE id = ?", [analysis, recordId]);
      res.json({ analysis });

    } catch (error) {
      console.error("❌ Analysis Error:", error);
      res.status(500).json({ message: "AI Analysis failed", debug: error.message });
    }
  });
});

// ✅ AI/ML SYMPTOM CHECKER Route (Python Microservice Integration)
app.post('/predict-symptoms', async (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms || !Array.isArray(symptoms)) {
    return res.status(400).json({ message: "Symptoms list is required" });
  }

  console.log(`🧠 Calling Python ML Service for symptoms: ${symptoms.join(', ')}`);

  try {
    const response = await axios.post('http://localhost:8000/predict', { symptoms });
    res.json(response.data);
  } catch (error) {
    console.warn("⚠️ Python ML Service offline. Falling back to Gemini/Groq...");

    // Fallback logic using Gemini/Groq
    try {
      const prompt = `
        Analyze these symptoms: ${symptoms.join(', ')}
        
        Provide a response in JSON format:
        1. "condition": A likely condition.
        2. "confidence": "AI Fallback Prediction".
        3. "recommendation": Professional but cautious advice.
        4. "severity": (Low/Moderate/High).
      `;

      let resultJson;
      if (groq) {
        const completion = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "llama-3.3-70b-versatile",
          response_format: { type: "json_object" }
        });
        resultJson = JSON.parse(completion.choices[0].message.content);
      } else {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().replace(/```json|```/g, '').trim();
        resultJson = JSON.parse(responseText);
      }
      res.json(resultJson);
    } catch (aiError) {
      console.error("❌ AI Fallback also failed:", aiError);
      res.status(500).json({
        message: "ML Service and AI Fallback unavailable",
        debug: "Please ensure the Node and Python servers are properly configured."
      });
    }
  }
});

// ✅ FREE-FORM SYMPTOM ANALYSIS Route (Gemini/Groq)
app.post('/analyze-symptoms-text', async (req, res) => {
  const { userId, text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Symptom description is required" });
  }

  console.log(`🔍 AI Symptom Analysis for user ${userId}: "${text}"`);

  try {
    const prompt = `
      You are an expert AI Medical Diagnostic Assistant. 
      Analyze the following symptoms described by a user: "${text}"
      
      Provide a response in JSON format with the following keys:
      1. "condition": A likely condition or category of issue.
      2. "confidence": A high/medium/low assessment based on description.
      3. "recommendation": Professional but cautious advice on what to do next.
      4. "severity": (Low/Moderate/High/Emergency).
      
      Important: Add a disclaimer that this is not a professional diagnosis.
    `;

    let resultJson;

    if (groq) {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" }
      });
      resultJson = JSON.parse(completion.choices[0].message.content);
    } else {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let textResponse = response.text();
      // Clean up markdown if AI returns it
      textResponse = textResponse.replace(/```json|```/g, '').trim();
      resultJson = JSON.parse(textResponse);
    }

    res.json(resultJson);

  } catch (error) {
    console.error("❌ Symptom Analysis Error:", error);
    res.status(500).json({ message: "AI Analysis failed", debug: error.message });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Access the website at: http://localhost:${PORT}`);
});
