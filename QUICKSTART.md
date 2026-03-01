# 🚀 Quick Start Guide - Healthcare System

## Getting Started in 5 Minutes

### Step 1: Setup (2 minutes)

1. **Install Dependencies**
   ```bash
   cd Healthcare-system-
   npm install
   ```

2. **Configure API Key** (Optional - for AI Chatbot)
   - Open `.env` file
   - Get your Gemini API key from: https://makersuite.google.com/app/apikey
   - Replace `your_api_key_here` with your actual key
   
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Start the Server**
   ```bash
   npm start
   ```
   
   You should see:
   ```
   ✅ Connected to SQLite database.
   🚀 Server running on port 3000
   ```

### Step 2: Access the Application (1 minute)

1. Open your browser
2. Navigate to: `http://localhost:3000`
3. You'll see the landing page with all features

### Step 3: Create an Account (1 minute)

1. Click **"Signup"** in the navigation
2. Fill in your details:
   - Name
   - Email
   - Password
   - Gender
   - Mobile
   - Age
3. Click **"Sign Up"**
4. You'll be redirected to login

### Step 4: Explore Features (1 minute)

1. **Login** with your credentials
2. Click **"Get Started with AI Healthcare"**
3. You're now on the Dashboard!

---

## 🎯 Feature Tour

### Dashboard
- View your health stats
- See weekly trends in charts
- Toggle dark mode (moon icon)
- Use quick actions to navigate

### Book an Appointment
1. Click "Book Appointment" from dashboard
2. Select a doctor (click on card)
3. Choose a date
4. Pick a time slot
5. Select appointment type
6. Describe your symptoms
7. Click "Book Appointment"

### Track Medications
1. Navigate to Medications
2. Enter medication name and dosage
3. Select frequency (1-4 times daily)
4. Set reminder times
5. Add duration and instructions
6. Click "Add Medication"

### Monitor Health
1. Go to Health Tracker
2. Calculate your BMI first
3. Select a metric (Blood Pressure, Sugar, Weight, Temperature)
4. Enter your measurement
5. View trends in the chart

### Find Hospitals
1. Open Hospital Finder
2. Click "Use My Location" (allow permission)
3. Or search by address
4. Filter by type (Hospital, Clinic, etc.)
5. Click on a hospital card to see on map
6. Get directions or call

---

## 🎨 Pages Overview

| Page | URL | Purpose |
|------|-----|---------|
| Landing | `index.html` | First page, feature overview |
| Dashboard | `dashboard.html` | Main health hub |
| Appointments | `appointments.html` | Book & manage appointments |
| Medications | `medications.html` | Track medications |
| Health Tracker | `health-tracker.html` | Log vital signs |
| Find Hospitals | `nearby-hospitals.html` | Locate facilities |
| AI Chatbot | `aichatbot.html` | Chat with AI |
| Symptoms | `symptoms-checker.html` | Check symptoms |
| Medical History | `medicalhistory.html` | View records |
| Healthcare Tips | `healthcare-tips.html` | Health advice |

---

## 🔧 Troubleshooting

### Server won't start
```bash
# Make sure you're in the right directory
cd Healthcare-system-

# Reinstall dependencies
rm -rf node_modules
npm install

# Try starting again
npm start
```

### Charts not showing
- Make sure you have internet connection (Chart.js loads from CDN)
- Check browser console for errors (F12)
- Try refreshing the page

### Map not loading
- Check internet connection (Leaflet.js and map tiles need internet)
- Allow location permissions when prompted
- Try a different browser

### AI Chatbot not working
- Ensure you've added your Gemini API key in `.env`
- Restart the server after adding the key
- Check if you have API quota remaining

### Database errors
- The SQLite database is created automatically
- If issues persist, delete `healthcare.db` and restart
- Tables will be recreated automatically

---

## 💡 Pro Tips

1. **Dark Mode**: Click the moon icon in the dashboard for dark mode
2. **Quick Navigation**: Use the sidebar to jump between features
3. **Mobile**: Works great on phones - try it!
4. **Notifications**: Allow browser notifications for medication reminders
5. **Location**: Allow location access for accurate hospital distances
6. **Data**: All your data is stored locally in SQLite
7. **Charts**: Hover over chart points for exact values
8. **Filters**: Use filters in hospital finder for quick results

---

## 📊 Sample Data

The application comes with sample data to help you explore:

### Sample Appointments
- Dr. Sarah Johnson - Feb 20, 2026
- Dr. Michael Chen - Feb 25, 2026

### Sample Medications
- Aspirin 500mg - Twice daily
- Vitamin D 1000 IU - Once daily

### Sample Health Data
- Blood Pressure: 120/80
- Blood Sugar: 95 mg/dL
- Weight: 70 kg

### Sample Hospitals
- City General Hospital
- Emergency Care Center
- Wellness Family Clinic
- 24/7 Health Pharmacy
- Metropolitan Medical Center

---

## 🎓 Learning Resources

### For Users
- Explore each feature by clicking around
- Read the tooltips and help text
- Check the FEATURES.md for detailed documentation

### For Developers
- Review the code comments
- Check README.md for technical details
- Inspect the database schema in server.js
- Look at the API endpoints

---

## 🆘 Need Help?

1. **Check the README**: Comprehensive documentation
2. **Read FEATURES.md**: Detailed feature guide
3. **Browser Console**: Press F12 to see errors
4. **Server Logs**: Check terminal for server errors
5. **GitHub Issues**: Report bugs or request features

---

## 🎉 You're All Set!

Your Healthcare System is now ready to use. Start by:
1. ✅ Creating an account
2. ✅ Exploring the dashboard
3. ✅ Booking your first appointment
4. ✅ Adding a medication
5. ✅ Logging some health data

**Enjoy managing your health with AI! 🏥💊📊**

---

**Last Updated**: February 15, 2026  
**Version**: 2.0  
**Support**: Check README.md for contact information
