import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Configuración mejorada de CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Conexión mejorada a SQLite
const db = new sqlite3.Database('./passwords.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error al conectar a SQLite:', err.message);
    process.exit(1); // Salir si no puede conectar a la base de datos
  }
  console.log('Conectado a SQLite database');
});

// Verificación de tablas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS passwords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error al crear tabla:', err.message);
    }
  });
});

// Endpoints con mejor manejo de errores
app.get('/api/passwords', (req, res) => {
  db.all('SELECT * FROM passwords ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      console.error('Error en GET /api/passwords:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(rows || []);
  });
});

// [Aquí van los otros endpoints POST, PUT, DELETE...]

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});