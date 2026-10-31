/**
 * Database Query Utility for VS Code Terminal
 * Usage:
 *   node query_db.js
 *   node query_db.js "SELECT * FROM users"
 *   node query_db.js "SELECT * FROM voter_records"
 *   node query_db.js "SELECT * FROM candidates"
 */

const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new DatabaseSync(dbPath);

const query = process.argv[2] || `
  SELECT 
    usn, 
    full_name, 
    department, 
    semester, 
    role,
    (SELECT COUNT(*) FROM voter_records WHERE user_id = users.id) AS votes_cast
  FROM users 
  ORDER BY role DESC, usn ASC
`;

console.log('\n===============================================================');
console.log('  📊 SQL QUERY EXECUTION RESULT');
console.log('===============================================================');
console.log('QUERY:', query.trim());
console.log('---------------------------------------------------------------');

try {
  const stmt = db.prepare(query);
  const rows = stmt.all();
  console.table(rows);
  console.log(`Total Rows: ${rows.length}`);
} catch (err) {
  console.error('SQL Execution Error:', err.message);
}
console.log('===============================================================\n');
