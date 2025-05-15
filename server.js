import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Abre la base de datos SQLite
let db;
(async () => {
  db = await open({
    filename: './passwords.db',
    driver: sqlite3.Database
  });

  // Verificación de tablas
  await db.exec(`CREATE TABLE IF NOT EXISTS passwords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  // SOLO aquí inicia el servidor
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
  }).on('error', (err) => {
    console.error('Error al iniciar el servidor:', err);
  });
})();

// Endpoint para obtener todas las contraseñas
app.get('/api/passwords', async (req, res) => {
  try {
    const passwords = await db.all('SELECT * FROM passwords ORDER BY created_at DESC');
    res.json(passwords);
  } catch (error) {
    console.error('Error en GET /api/passwords:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para agregar una nueva contraseña
app.post('/api/passwords', async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  try {
    const result = await db.run(
      'INSERT INTO passwords (name, username, password) VALUES (?, ?, ?)',
      [name, username, password]
    );
    res.status(201).json({
      id: result.lastID,
      name,
      username,
      password,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en POST /api/passwords:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// [Aquí van los otros endpoints PUT, DELETE...]

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});