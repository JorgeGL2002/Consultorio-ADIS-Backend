const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

const db = mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'tkcBygBXQPBogmXxDMXEeGqUdPiLgoYb',
  database: 'railway'
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});

app.get('/citas', (req, res) => {
  db.query('SELECT * FROM Trabajadores', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use(cors({
  origin: 'https://consultorio-adis-frontend-production.up.railway.app'
}));
