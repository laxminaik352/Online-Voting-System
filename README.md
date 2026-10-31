# 🗳️ CampusVote - College Online Voting System
### Full Stack Development (FSD) Academic Project
**Allotted Problem Statement No. 17:** *Online Voting System*  
**Allotted Students:** **USN: U15FY24S0033** &amp; **USN: U15FY24S0034**  
**Submission Deadline:** 30 October 2026 | **Presentation Date:** 31 October 2026  

---

## 🌟 Overview
**CampusVote** is a complete, modern, responsive full-stack web application designed for conducting collegiate student council elections with enterprise-grade security, transparency, and real-time analytical reporting.

### Key Highlights:
- **One Student, One Vote:** Enforced by dual-layer validation (Server controller + SQLite `UNIQUE` constraint).
- **Secret Ballot Guarantee:** Anonymous votes decoupled from voter identity using cryptographic SHA-256 receipt hashing.
- **Digital Voting Receipt:** Generates tamper-evident cryptographic receipt codes (`CV-2026-XXXX`) for students to audit their ballots.
- **Live Visual Analytics:** Instant tabulation with interactive Chart.js bar and donut charts showing turnout by academic department.
- **Dual-Role Access Control:** Separate portals for Student Voters and Election Officers.
- **One-Click Presentation Shortcuts:** Pre-configured demo logins for USN 33, USN 34, and Admin.

---

## 📁 Project Folder Structure

```
online voting sustem/
├── package.json               # Project dependencies and npm scripts
├── package-lock.json          # Dependency lockfile
├── server.js                  # Main Express backend server & auto-seeder
├── start.bat                  # One-click Windows startup script
├── .env                       # Environment configuration
├── database.sqlite            # Relational SQLite database with WAL mode
├── src/
│   ├── config/
│   │   └── database.js        # SQLite connection & table initialization
│   ├── controllers/
│   │   ├── authController.js      # Student USN registration & login
│   │   ├── electionController.js  # Election lifecycle & contests
│   │   ├── candidateController.js # Candidate nominations & positions
│   │   ├── voteController.js      # Atomic voting & receipt verification
│   │   ├── resultController.js    # Vote tallying & Chart.js statistics
│   │   └── adminController.js     # Voters list & security audit logs
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification & Admin guards
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── electionRoutes.js
│   │   ├── candidateRoutes.js
│   │   ├── voteRoutes.js
│   │   ├── resultRoutes.js
│   │   └── adminRoutes.js
│   └── seed/
│       └── seedData.js        # Realistic college seed data with USN 33/34
├── public/                    # Frontend UI (HTML, CSS, JS)
│   ├── index.html             # Homepage with live contest & receipt verifier
│   ├── login.html             # Login with 1-click viva demo presets
│   ├── register.html          # Student USN registration form
│   ├── dashboard.html         # Interactive voting booth & digital receipt
│   ├── results.html           # Live results with Chart.js visualization
│   ├── admin.html             # Election Officer administration console
│   ├── css/
│   │   ├── style.css          # Design system & responsive styles
│   │   └── dashboard.css      # Ballot cards, stats, and receipt modal
│   └── js/
│       └── api.js             # API client, JWT storage, toast notifications
└── docs/
    ├── PROJECT_REPORT.md      # Comprehensive academic project report
    └── PRESENTATION_GUIDE.md  # Viva preparation script & Q&A cheat sheet
```

---

## 🚀 How to Run the Project

### Option 1: One-Click Launch (Windows)
Double-click the **`start.bat`** file in the root directory.

### Option 2: Using Terminal
```bash
# 1. Install dependencies (already pre-installed)
npm install

# 2. Start the server
npm start
```

Open your browser and navigate to:
👉 **`http://localhost:3000`**

---

## 🔑 Demo Login Credentials for College Viva

| Role | Name | USN / Identifier | Password | Access Area |
| :--- | :--- | :--- | :--- | :--- |
| **Student Voter 1 (Lead)** | Kiran Kumar | `U15FY24S0033` | `Password@123` | Voting Booth / Ballot |
| **Student Voter 2 (Partner)** | Rahul Sharma | `U15FY24S0034` | `Password@123` | Voting Booth / Ballot |
| **Chief Election Officer** | Dr. Ramesh Rao | `ADMIN001` | `Admin@123` | Admin Control Panel |

*(You can also click the 1-click shortcut buttons on `http://localhost:3000/login.html`!)*

---

## 📖 Documentation & College Presentation Files
- [docs/PROJECT_REPORT.md](file:///c:/Users/klemp/Downloads/online%20voting%20sustem/docs/PROJECT_REPORT.md) — Complete academic project report ready for college submission.
- [docs/PRESENTATION_GUIDE.md](file:///c:/Users/klemp/Downloads/online%20voting%20sustem/docs/PRESENTATION_GUIDE.md) — Step-by-step viva presentation script and Top 10 examiner questions & answers.

---

## 🛡️ API Endpoints Summary

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register student voter with USN | Public |
| `POST` | `/api/auth/login` | Login with USN/Email & password | Public |
| `GET` | `/api/auth/profile` | Get current voter profile & history | Authenticated |
| `GET` | `/api/elections` | Get active & past elections | Public |
| `GET` | `/api/elections/:id` | Get election positions & candidates | Public / Auth |
| `POST` | `/api/votes/cast` | Cast ballot for position | Student Voter |
| `GET` | `/api/votes/receipt/:code` | Public cryptographic receipt audit | Public |
| `GET` | `/api/results/:id` | Tally results & Chart.js data | Public |
| `GET` | `/api/admin/voters` | Get list of all registered voters | Admin Only |
| `GET` | `/api/admin/audit-logs` | Get immutable security audit trail | Admin Only |
| `POST` | `/api/admin/reset-seed` | Reset & re-seed demo data | Admin Only |
