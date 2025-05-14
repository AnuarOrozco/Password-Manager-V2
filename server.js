const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de SQLite
const db = new sqlite3.Database('./passwords.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS passwords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// API Endpoints
app.get('/api/passwords', (req, res) => {
  db.all('SELECT * FROM passwords', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/passwords', (req, res) => {
  const { name, username, password } = req.body;
  db.run(
    'INSERT INTO passwords (name, username, password) VALUES (?, ?, ?)',
    [name, username, password],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.put('/api/passwords/:id', (req, res) => {
  const { name, username, password } = req.body;
  db.run(
    'UPDATE passwords SET name = ?, username = ?, password = ? WHERE id = ?',
    [name, username, password, req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

app.delete('/api/passwords/:id', (req, res) => {
  db.run(
    'DELETE FROM passwords WHERE id = ?',
    [req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});