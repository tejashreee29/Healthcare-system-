# Healthcare Chatbot Web Application

A comprehensive web-based Healthcare AI application that helps users manage their health efficiently with cutting-edge features including AI chatbot, health tracking, appointment booking, medication reminders, and more.

## 🌟 Features

### Core Features
- **User Authentication**: Secure login and registration system with encrypted passwords
- **Medical Form Submission**: Add and update personal medical information
- **AI-Powered Chatbot**: Get instant health advice using Google Gemini AI
- **Symptom Checker**: Preliminary analysis based on input symptoms

### 🆕 New Premium Features

#### 📊 Health Dashboard
- Real-time health metrics visualization
- Interactive charts showing weekly health trends
- Activity breakdown with doughnut charts
- Quick stats for temperature, blood pressure, heart rate, and steps
- Dark mode toggle for comfortable viewing
- Responsive design for all devices

#### 📅 Appointment Booking System
- Book appointments with multiple specialist doctors
- Interactive doctor selection with specialties
- Time slot selection with availability tracking
- Appointment type categorization (consultation, follow-up, emergency, checkup)
- View and manage all your appointments
- Reschedule and cancel functionality
- Appointment status tracking (confirmed/pending)

#### 💊 Medication Tracker & Reminder
- Add medications with custom dosages
- Set multiple daily reminders (1-4 times per day)
- Track medication adherence rate
- View active medications and remaining days
- Special instructions for each medication
- Mark doses as taken or skipped
- Visual reminder time badges
- Medication statistics dashboard

#### 📈 Health Tracker
- **BMI Calculator**: Calculate and categorize your BMI
- **Multi-metric Tracking**:
  - Blood Pressure monitoring
  - Blood Sugar levels
  - Weight tracking
  - Body Temperature
- Interactive charts showing health trends
- Historical data with timestamps
- Quick stats overview
- Export and delete measurements

#### 🏥 Find Nearby Hospitals
- Interactive map with real hospital locations
- Filter by type: Hospitals, Clinics, Emergency Centers, Pharmacies
- Distance calculation from your location
- Get directions to facilities
- Call hospitals directly from the app
- Emergency 911 quick dial
- Geolocation support
- Hospital ratings and reviews
- Operating hours display

### Additional Features
- **Healthcare Tips**: Personalized health recommendations
- **Medical History**: Track past records and surgeries
- **Emergency Contacts**: Quick access to emergency services
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode**: Eye-friendly dark theme option
- **Real-time Notifications**: Get alerts for appointments and medications

## 🛠 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js for data visualization
- **Maps**: Leaflet.js for interactive maps
- **Backend**: Node.js with Express
- **Database**: SQLite for data persistence
- **AI/ML**: Google Gemini AI (gemini-1.5-flash)
- **Authentication**: bcrypt for password hashing
- **APIs**: 
  - Google Generative AI
  - Geolocation API
  - Notifications API

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/healthcare-chatbot.git
   ```

2. Navigate to the project directory:
   ```bash
   cd healthcare-chatbot
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your API keys:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

5. Start the application:
   ```bash
   npm start
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 🚀 Usage

1. **Sign Up**: Create a new account with your details
2. **Login**: Access your personalized dashboard
3. **Explore Dashboard**: View your health metrics and quick actions
4. **Book Appointments**: Schedule consultations with doctors
5. **Track Medications**: Add your medications and set reminders
6. **Monitor Health**: Log vital signs and track trends
7. **Find Hospitals**: Locate nearby healthcare facilities
8. **Chat with AI**: Get instant health advice 24/7

## 📱 Pages Overview

- `index.html` - Landing page with feature overview
- `dashboard.html` - Main health dashboard with stats and charts
- `appointments.html` - Book and manage appointments
- `medications.html` - Medication tracker with reminders
- `health-tracker.html` - Track vital signs and BMI
- `nearby-hospitals.html` - Find healthcare facilities with map
- `aichatbot.html` - AI-powered health chatbot
- `symptoms-checker.html` - Symptom analysis tool
- `medicalhistory.html` - Medical records management
- `healthcare-tips.html` - Health tips and advice
- `signup.html` / `login.html` - User authentication

## 🔐 Security Features

- Password encryption using bcrypt
- Secure session management
- SQL injection prevention
- Input validation and sanitization
- HTTPS ready

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Glassmorphism effects
- Interactive hover states
- Responsive grid layouts
- Custom icons and emojis
- Premium color schemes
- Dark mode support

## 📊 Database Schema

### Users Table
- id, name, email, password, gender, mobile, age

### Medical History Table
- id, userId, chronic_conditions, allergies, medications, past_surgeries, height, weight, blood_group, lifestyle, additional_info

### Chat History Table
- id, userId, message, response, timestamp

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Created with ❤️ for better healthcare accessibility

## 🆘 Support

For support, email support@aihealthcare.com or create an issue in the repository.

---

**Note**: This is a demo application. Always consult with real healthcare professionals for medical advice.
