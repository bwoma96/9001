const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'milandb',
  password: '1234',
  port: 5432,
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve the word.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'word.html'));
});

// Handle form submission
app.post('/add-word', async (req, res) => {
  const { word } = req.body;
  try {
    await pool.query('INSERT INTO words (word) VALUES ($1)', [word]);
    res.send('Word added successfully!');
  } catch (err) {
    console.error(err);
    res.send('Error adding word.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});