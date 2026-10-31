require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./src/config/database');
const seedDatabase = require('./src/seed/seedData');

// Route Imports
const authRoutes = require('./src/routes/authRoutes');
const electionRoutes = require('./src/routes/electionRoutes');
const candidateRoutes = require('./src/routes/candidateRoutes');
const voteRoutes = require('./src/routes/voteRoutes');
const resultRoutes = require('./src/routes/resultRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Auto-seed on first run if database is fresh
try {
  const electionCount = db.get('SELECT COUNT(*) AS count FROM elections');
  if (!electionCount || electionCount.count === 0) {
    console.log('Fresh installation detected. Initializing demo college election data...');
    seedDatabase();
  }
} catch (e) {
  console.log('Database initialized.');
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    project: 'CampusVote - College Online Voting System',
    allocatedUSN: 'U15FY24S0033 & U15FY24S0034'
  });
});

// Fallback to index.html for root navigation
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API endpoint not found.' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error occurred.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
===============================================================
  🗳️  CAMPUSVOTE - COLLEGE ONLINE VOTING SYSTEM
===============================================================
  🚀 Server Running:    http://localhost:${PORT}
  💻 Allotted USN:      U15FY24S0033 & U15FY24S0034
  📂 Problem Statement: No. 17 (Online Voting System)
---------------------------------------------------------------
  🔑 QUICK LOGIN CREDENTIALS FOR PRESENTATION:
  
  [Student Voter 1 - Allotted USN 33]:
  • USN:      U15FY24S0033
  • Password: Password@123
  
  [Student Voter 2 - Partner USN 34]:
  • USN:      U15FY24S0034
  • Password: Password@123
  
  [Election Admin / Faculty In-Charge]:
  • USN:      ADMIN001
  • Password: Admin@123
===============================================================
  `);
});
