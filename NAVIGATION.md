# 🗺️ Healthcare System - Navigation Map

## Visual Navigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         index.html                               │
│                      (Landing Page)                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • Signup                                                 │  │
│  │  • Login                                                  │  │
│  │  • Healthcare Tips                                        │  │
│  │  • Get Started → dashboard.html                          │  │
│  │  • Talk to AI Chatbot → aichatbot.html                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      signup.html / login.html                    │
│                    (User Authentication)                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        homepage.html                             │
│                      (User Homepage)                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  9 Feature Cards:                                         │  │
│  │  1. AI Chatbot → aichatbot.html                          │  │
│  │  2. Symptom Checker → symptoms-checker.html              │  │
│  │  3. Medical History → medicalhistory.html                │  │
│  │  4. Healthcare Tips → healthcare-tips.html               │  │
│  │  5. 📊 Health Dashboard → dashboard.html                 │  │
│  │  6. 📅 Book Appointment → appointments.html              │  │
│  │  7. 💊 Medications → medications.html                    │  │
│  │  8. 📈 Health Tracker → health-tracker.html              │  │
│  │  9. 🏥 Find Hospitals → nearby-hospitals.html            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    📊 dashboard.html (NEW!)                      │
│                     (Main Health Hub)                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Sidebar Navigation:                                      │  │
│  │  • Dashboard (current)                                    │  │
│  │  • AI Chatbot                                            │  │
│  │  • Symptoms                                              │  │
│  │  • Medical History                                       │  │
│  │  • Appointments                                          │  │
│  │  • Medications                                           │  │
│  │  • Health Tracker                                        │  │
│  │  • Find Hospitals                                        │  │
│  │  • Settings                                              │  │
│  │  • Logout                                                │  │
│  │                                                           │  │
│  │  Main Content:                                            │  │
│  │  • Health Stats (4 cards)                                │  │
│  │  • Charts (2 interactive charts)                         │  │
│  │  • Quick Actions (4 buttons)                             │  │
│  │  • Dark Mode Toggle                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## New Feature Pages Detail

### 📅 Appointments Page
```
appointments.html
├── Doctor Selection (4 doctors)
│   ├── Dr. Sarah Johnson (Cardiologist)
│   ├── Dr. Michael Chen (General Physician)
│   ├── Dr. Emily Davis (Dermatologist)
│   └── Dr. James Wilson (Orthopedic)
├── Date & Time Selection
│   ├── Date Picker
│   └── 6 Time Slots
├── Appointment Type
│   ├── General Consultation
│   ├── Follow-up
│   ├── Emergency
│   └── Regular Checkup
└── Your Appointments List
    ├── View All
    ├── Reschedule
    └── Cancel
```

### 💊 Medications Page
```
medications.html
├── Add Medication Form
│   ├── Medication Name
│   ├── Dosage
│   ├── Frequency (1-4 times daily)
│   ├── Reminder Times
│   ├── Duration
│   └── Special Instructions
├── Statistics
│   ├── Active Medications
│   ├── Doses Today
│   └── Adherence Rate
└── Your Medications List
    ├── View Details
    ├── Mark as Taken
    ├── Skip Dose
    └── Delete
```

### 📈 Health Tracker Page
```
health-tracker.html
├── BMI Calculator
│   ├── Height Input
│   ├── Weight Input
│   └── Calculate & Categorize
├── Metric Selection
│   ├── Blood Pressure
│   ├── Blood Sugar
│   ├── Weight
│   └── Temperature
├── Data Entry Form
│   ├── Value Input
│   └── Date/Time
├── Charts & Trends
│   └── Interactive Line Chart
└── Measurement History
    ├── Recent Entries
    └── Delete Option
```

### 🏥 Find Hospitals Page
```
nearby-hospitals.html
├── Emergency Banner
│   └── Call 911 Button
├── Search Bar
│   ├── Location Search
│   └── Use My Location
├── Filter Tabs
│   ├── All
│   ├── Hospitals
│   ├── Clinics
│   ├── Emergency
│   └── Pharmacies
├── Hospitals List (5 facilities)
│   ├── Name & Type
│   ├── Address
│   ├── Phone
│   ├── Hours
│   ├── Rating
│   ├── Distance
│   ├── Get Directions
│   └── Call Button
└── Interactive Map
    ├── Custom Markers
    ├── Zoom Controls
    └── Click for Details
```

## Page Interconnections

```
         ┌─────────────────┐
         │   index.html    │
         │  (Landing Page) │
         └────────┬────────┘
                  │
         ┌────────┴────────┐
         │                 │
    ┌────▼────┐      ┌────▼────┐
    │ signup  │      │  login  │
    └────┬────┘      └────┬────┘
         │                │
         └────────┬───────┘
                  │
         ┌────────▼────────┐
         │  homepage.html  │
         │  (User Home)    │
         └────────┬────────┘
                  │
         ┌────────▼────────┐
         │ dashboard.html  │◄─────┐
         │ (Main Hub)      │      │
         └────────┬────────┘      │
                  │                │
    ┌─────────────┼─────────────┐ │
    │             │             │ │
┌───▼───┐   ┌────▼────┐   ┌───▼─▼──┐
│appoint│   │medicat- │   │health- │
│ments  │   │ions     │   │tracker │
└───────┘   └─────────┘   └────────┘
                │
         ┌──────▼──────┐
         │nearby-      │
         │hospitals    │
         └─────────────┘
```

## Quick Access Paths

### Path 1: Book Appointment
```
index.html → Login → Dashboard → Appointments
```

### Path 2: Track Medication
```
index.html → Login → Dashboard → Medications
```

### Path 3: Log Health Data
```
index.html → Login → Dashboard → Health Tracker
```

### Path 4: Find Hospital
```
index.html → Login → Dashboard → Find Hospitals
```

### Path 5: Chat with AI
```
index.html → AI Chatbot (direct)
OR
index.html → Login → Dashboard → AI Chatbot
```

## Mobile Navigation

On mobile devices (< 768px):
- Sidebar collapses to hamburger menu
- Cards stack vertically
- Touch-friendly buttons
- Swipe-friendly charts
- Responsive map controls

## Keyboard Shortcuts (Future Enhancement)

Suggested shortcuts for power users:
- `Ctrl + D` - Dashboard
- `Ctrl + A` - Appointments
- `Ctrl + M` - Medications
- `Ctrl + H` - Health Tracker
- `Ctrl + F` - Find Hospitals
- `Ctrl + C` - AI Chatbot
- `Ctrl + /` - Search

## Breadcrumb Navigation (Future Enhancement)

Example breadcrumbs:
```
Home > Dashboard > Appointments > Book New
Home > Dashboard > Medications > Add Medication
Home > Dashboard > Health Tracker > Blood Pressure
```

## Back Navigation

All new pages have a "Back to Dashboard" button:
```html
<a href="dashboard.html" class="back-btn">
    ← Back to Dashboard
</a>
```

## External Links

Pages with external integrations:
- **Find Hospitals**: Links to Google Maps for directions
- **Appointments**: Phone call links (tel:)
- **Emergency**: 911 quick dial
- **AI Chatbot**: Google Gemini API

## Session Flow

```
1. User lands on index.html
2. Clicks "Get Started"
3. Redirected to signup.html (if new) or login.html
4. After login → homepage.html
5. Clicks feature card → specific feature page
6. Uses sidebar to navigate between features
7. Returns to dashboard as home base
8. Logout → back to index.html
```

## Data Flow

```
User Input → Frontend Form → Backend API → SQLite Database
                ↓
        Local Storage (preferences)
                ↓
        Charts/Visualizations
```

## API Endpoints (Backend)

```
POST /signup          - Create new user
POST /login           - Authenticate user
POST /submit-medical-history - Save medical data
POST /chatbot         - AI chat interaction
```

## File Structure

```
Healthcare-system-/
├── index.html (Landing)
├── homepage.html (User Home)
├── dashboard.html (NEW - Main Hub)
├── appointments.html (NEW - Appointments)
├── medications.html (NEW - Medications)
├── health-tracker.html (NEW - Health Tracker)
├── nearby-hospitals.html (NEW - Find Hospitals)
├── aichatbot.html (AI Chat)
├── symptoms-checker.html (Symptoms)
├── medicalhistory.html (Medical Records)
├── healthcare-tips.html (Tips)
├── signup.html (Registration)
├── login.html (Authentication)
├── settings.html (User Settings)
├── styles.css (Global Styles)
├── script.js (Global Scripts)
├── server.js (Backend)
├── package.json (Dependencies)
├── .env (Configuration)
├── README.md (Documentation)
├── FEATURES.md (Feature Guide)
├── QUICKSTART.md (Quick Start)
└── ENHANCEMENT_SUMMARY.md (Summary)
```

---

**Navigation Tip**: The dashboard is your central hub. From there, you can access all features via the sidebar!

**Mobile Tip**: On mobile, tap the hamburger menu (☰) to access the sidebar navigation.

**Pro Tip**: Bookmark the dashboard page for quick access to all features!
